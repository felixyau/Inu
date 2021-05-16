import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Args,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constant";
import { validateUserName } from "../utilities/validateUserInput";
import { registerUserInput } from "./registerUserInput";
import { FieldError } from "./Error";
import { v4 } from "uuid";
import { sendEmails } from "../utilities/sendEmails";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class userResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) return null;
    return User.findOne(req.session.userId);
  }

  @Mutation(()=>UserResponse)
  async changePassword(
    @Arg("token") token:string,
    @Arg("newPassword") newPassword:string,
    @Ctx() {redis} :MyContext
  ) : Promise<UserResponse> {
    if (newPassword.length <= 6) {
      return {
        errors: [
        {
          field: "newPassword",
          msg: "password must be longer than 6 characters",
        },
      ]}
    }
    const key = FORGET_PASSWORD_PREFIX + token
    const userId = await redis.get(key)
    if (!userId) return {
      errors: [
      {
        field: "token",
        msg: "token expired",
      },
    ]}
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            msg: "user doesn't exist"
          }
        ]
      }
    }

    await User.update({id:userIdNum}, {password: await argon2.hash(newPassword)})
    return { user };
  }

  @Mutation(()=>Boolean)
  async forgotPassword(
    @Arg("useremail") useremail: string,
    @Ctx() { redis } : MyContext
  ) {
    const user = await User.findOne({email: useremail})
    if (!user) return true;
    const TOKEN = v4();

    await redis.set( //cant understand
      FORGET_PASSWORD_PREFIX + TOKEN,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    )

    sendEmails(useremail, `<a href=http://localhost:3000/change-password/${TOKEN}>Reset Password<a>`)
    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: registerUserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateUserName(options);
    if (errors) return {errors};
    const user = new User();
    const hashedPassword = await argon2.hash(options.password);
 
    user.username = options.username;
    user.email = options.email;
    user.password = hashedPassword;

    try {
      await em.save(user);
    } catch (err) {
      if (err.code === "23505") {
        //duplicate username
        console.log("hello");
        return {
          errors: [
            {
              field: "username",
              msg: "username already exists",
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: "dont' know",
              msg: "error code != 23505",
            },
          ],
        };
      }
    }
    //use session, set cookie and keep user login
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User,  usernameOrEmail.includes("@") ? { email:usernameOrEmail } : {username:usernameOrEmail});
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            msg: "username or email doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            msg: "wrong password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {user};
  }

  @Mutation(()=>Boolean)
  logout(@Ctx() { req,res }: MyContext) : Promise<Boolean> {
    return new Promise((resolve) => req.session.destroy((err)=> {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.log(err)
        resolve(false)
      }
      resolve(true);
    }))
  }
}
