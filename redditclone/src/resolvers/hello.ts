import { ObjectType, Query, Resolver } from "type-graphql";
@ObjectType()
@Resolver()
export class helloResolver {
  @Query(()=>String)
  hello() {
      return "hello";
  }
}