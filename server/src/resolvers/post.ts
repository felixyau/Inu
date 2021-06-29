import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { Comments } from "../entities/Comments";
import { Post } from "../entities/Posts";
import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { tryCatchHell } from "../utilities/tryCatchHell";
import { FieldError } from "./Error";

@InputType()
class postInput {
  @Field()
  title!: string;

  @Field()
  text!: string;

  @Field()
  photo!: string;
}

@ObjectType()
export class PaginatedPost {
  @Field()
  hasMore: Boolean;

  @Field(() => [Post])
  posts: Post[];
}

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(Post)
export class postResolver {
  @FieldResolver(()=>[Comments], {nullable:true})
  async comments(
    @Root() post:Post,
    @Arg("limit", () => Int, {nullable:true}) limit: number,
    @Arg("duplicateUserComment", () => Int, {nullable:true}) duplicateUserComment: number,
    ) {
      const comments = await getConnection().query(
      `
      SELECT c.*
      FROM comments c
      WHERE c."postId" = ${post.id} 
      ${duplicateUserComment ? `WHERE c."userId" <> ${duplicateUserComment} ` : ""}
      ORDER BY c."createdAt" DESC
      ${limit? `limit ${limit}` : ""}
      `);
      if (!comments) return null;
      return comments
    }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { req, updootLoader }: MyContext
  ) :Promise<boolean | null> {
    if (!req.session.userId) return false;
    const updoot = await updootLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });
    console.log("updoot:", updoot)
    return !!updoot;
  }

  @Query(() => PaginatedPost)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedPost> {
    const reallimit = Math.min(50, limit);
    const reallimitPlusOne = reallimit + 1;
    const replacements: any[] = [reallimitPlusOne];

    if (cursor) {
      replacements.push([new Date(parseInt(cursor))]);
    }

    const posts = await getConnection().query(
      ` 
      SELECT p.*
      FROM post p
      ${cursor ? `where p."createdAt" < $2 ` : ""}
      ORDER BY p."createdAt" DESC
      limit $1
    `,
      replacements
    ); //black magic??? $3 why cant ${new Date( parseInt(cursor))}

    // const qb =  getConnection()
    // .getRepository(Post)
    // .createQueryBuilder("post")
    // .innerJoinAndSelect("post.creator", "creator", ) //y this doesn't work
    // .where({})
    // .orderBy('post."createdAt"', "DESC")             //y only work when descending
    // .take(reallimitPlusOne)

    // if (cursor) {
    //   console.log("int:", parseInt(cursor))
    //   qb.where('post."createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) }) //is this larger than?
    // }

    // const posts = await qb.getMany();
    //console.log(posts);

    return {
      hasMore: posts.length === reallimitPlusOne,
      posts: posts.slice(0, reallimit),
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(()=> Comments, {nullable:true})
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("text") text: string,
    @Arg("postId", ()=>Int) postId: number,
    @Ctx() { req }: MyContext
  ) : Promise<Comments | null> {
    const [_,error] = await tryCatchHell(Post.findOne(postId))
    if (error) return null;

    const comment = await Comments.create({
      text,
      userId : req.session.userId,
      postId, 
    }).save()
    console.log("comment:",comment)
    return comment
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: MyContext
  ) {
    //sql style
    const { userId } = req.session;
    const updoot = await Updoot.findOne({ postId, userId });
    // const upvote = value !== -1;
    // const realValue = upvote ? 1 : -1;
    //voted before
    // if (updoot && updoot.value !== realValue) {
    //   await getConnection().transaction(async (tm) => {
    //     await tm.query(
    //       `
    //     UPDATE updoot 
    //     SET value = $1
    //     WHERE "postId" = $2 AND "userId" = $3
    //     `,
    //       [realValue, postId, userId]
    //     );
    //     await tm.query(
    //       `
    //     UPDATE post 
    //     SET points = points + $1
    //     WHERE "id" = $2
    //     `,
    //       [realValue * 2, postId]
    //     );
    //   });}
      if (updoot) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        DELETE FROM  updoot
        WHERE "postId" = $1 and "userId" = $2
        `,
          [postId, userId]
        );
        await tm.query(
          `
        UPDATE post 
        SET points = points - 1
        WHERE id = $1
        `,
          [postId]
        );
      });
    } else {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        INSERT INTO updoot ("userId","postId")
        VALUES ($1,$2);`,
          [userId, postId]
        );

        await tm.query(
          `
        UPDATE post
        SET points = points + 1
        WHERE id = $1;
        `,
          [postId]
        );
      });
    }

    //orm style
    // let post: Post | undefined;
    // try {
    //   post = await Post.findOne(postId);
    // } catch {
    //   return false;
    // }

    // const updoot = value !== -1;
    // const realValue = updoot ? 1 : -1;

    // try {
    //   await Updoot.insert({
    //     value: realValue,
    //     postId,
    //     userId: req.session.userId,
    //   });
    // } catch {
    //   return false;
    // }

    // post!.points += realValue;
    // post!.save();
    return true;
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth) //middlware are functions that run before resolvers and have acess to (parents, args, ctx, info) of resolvers
  async createPost(
    @Arg("input") input: postInput,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    if (!input.title) {
      return {
        errors: [
          {
            msg: "Title cannot be blank",
            field: "title",
          },
        ],
      };
    }
    if (!input.text) {
      return {
        errors: [
          {
            msg: "Text cannot be blank",
            field: "text",
          },
        ],
      };
    }
    if (!input.photo) {
      return {
        errors: [
          {
            msg: "Photo cannot be empty",
            field: "photo",
          },
        ],
      };
    }
    const post = await Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    return { post };
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("text", () => String, { nullable: true }) text: string
  ): Promise<PostResponse> {
    const post = await Post.findOne(id);
    if (!title) {
      return {
        errors: [
          {
            msg: "Title cannot be blank",
            field: "title",
          },
        ],
      };
    }
    if (!text) {
      return {
        errors: [
          {
            msg: "Text cannot be blank",
            field: "text",
          },
        ],
      };
    }

    post!.title = title;
    post!.text = text;
    await Post.update({ id }, { text, title });
    return { post };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const post = await Post.findOne(id);
    if (!post) return false;
    //const comments = await Comments.find({postId:id});
    await Comments.delete({postId:id});
    const userId = req.session.userId;
    if (post.creatorId !== userId) return false;
    await Updoot.delete({ postId: id });
    await Post.delete({ id });

    return true;
  }
}
