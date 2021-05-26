import { FieldResolver, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Comments } from "../entities/Comments";
import { User } from "../entities/User";

@ObjectType()
@Resolver((of) => Comments)
export class commentsResolver {
  @FieldResolver(() => User, { nullable: true })
  async user(@Root() comments: Comments) {
    return null;
    return await User.findOne(comments.userId);
  }
}
