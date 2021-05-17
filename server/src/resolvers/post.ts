import { Post } from "../entities/Posts";
import { MyContext } from "../types";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";


@InputType()
class postInput {
  @Field()
  title!:string

  @Field()
  text!:string
}

@Resolver(of=>Post)
export class postResolver {
  @FieldResolver(()=>String)
  TextSnippet(@Root() root:Post) {
    return root.text.slice(0,50);
  }

  @Query(() => [Post])
  async posts(
    @Arg("limit", ()=>Int) limit:number,
    @Arg("cursor", ()=>String, {nullable:true}) cursor:string | null,
  ): Promise<Post[]> {
    const reallimit = Math.min(50, limit)
    const qb =  getConnection()
    .getRepository(Post)
    .createQueryBuilder("p")
    .orderBy('p."createdAt"')
    .limit(reallimit)
    console.log("cursor:", cursor)
    
    if (cursor) {
      console.log("int:", parseInt(cursor))
      qb.where('p."createdAt" > :cursor', { cursor: new Date(parseInt(cursor)) })
    }
    return qb.getMany();
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }
  @Mutation(() => Post)
  @UseMiddleware(isAuth) //middlware are functions that run before resolvers and have acess to (parents, args, ctx, info) of resolvers
  async createPost(
    @Arg("input") input: postInput,
    @Ctx() {req} : MyContext
  ): Promise<Post> {
    return Post.create({...input, creatorId:req.session.userId}).save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) return null;

    post.title = title;
    if (title !== undefined) {
        Post.update({id}, {title})
    }
    return post;
  }
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
  ): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}
