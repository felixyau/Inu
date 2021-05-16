import { Post } from "../entities/Posts";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";


@InputType()
class postInput {
  @Field()
  title!:string

  @Field()
  text!:string
}

@Resolver()
export class postResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post);
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
