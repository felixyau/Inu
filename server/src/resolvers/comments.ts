import { Field, FieldResolver, Int, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Comments } from "../entities/Comments";
import { User } from "../entities/User";

@ObjectType()
export class usernameAndId {
  @Field()
  username!: string

  @Field(()=>Int)
  userId!: number
}

@ObjectType()
@Resolver((of) => Comments)
export class commentsResolver {

  @FieldResolver(() => User, { nullable: true }) 
  async commentor(@Root() comments: Comments) : Promise<User | null>{
    const user = await User.findOne(comments.userId);
    if (!user) return null
    return user;
  }
}
