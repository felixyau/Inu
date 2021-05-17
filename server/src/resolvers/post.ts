import { Post } from "../entities/Posts";
import { MyContext } from "../types";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";


@InputType()
class postInput {
  @Field()
  title!:string

  @Field()
  text!:string
}

@ObjectType()
export class PaginatedPost {
  @Field()
  hasMore:Boolean

  @Field(()=>[Post])
  posts: Post[]
}


@Resolver(of=>Post)
export class postResolver {
  @FieldResolver(()=>String)
  TextSnippet(@Root() root:Post) {
    return root.text.slice(0,50);
  }

  @Query(() => PaginatedPost)
  async posts(
    @Arg("limit", ()=>Int) limit:number,
    @Arg("cursor", ()=>String, {nullable:true}) cursor:string | null,
  ): Promise<PaginatedPost> {
    const reallimit = Math.min(50, limit)
    const reallimitPlusOne = reallimit+1;
    const qb =  getConnection()
    .getRepository(Post)
    .createQueryBuilder("p")
    .orderBy('p."createdAt"')
    .take(reallimitPlusOne)
    
    if (cursor) {
      console.log("int:", parseInt(cursor))
      qb.where('p."createdAt" > :cursor', { cursor: new Date(parseInt(cursor)) }) //is this larger than? 
    }

    const posts = await qb.getMany();
    return {
      hasMore: posts.length === reallimitPlusOne,
      posts: posts.slice(0,reallimit)
    }
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
