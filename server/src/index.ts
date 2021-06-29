/*
1. email authentication, now user can register with invalid email, but we can't send email to email with invalid format
2. each post only shows 50 letters
3. post limit=1 don't work ,posts mutation bug 
4. study sql espectially post mutation
5. how exactly cookie work, maintain login even when delete cookies
5. I can see password from network request now, is it the case in production only?
6. How server side rendering work, how next do it, how is server work? urql request 
*/
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constant";
import { Comments } from "./entities/Comments";
import { Post } from "./entities/Posts";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { commentsResolver } from "./resolvers/comments";
import { helloResolver } from "./resolvers/hello";
import { postResolver } from "./resolvers/post";
import { userResolver } from "./resolvers/user";
import { CreateUpdootLoader } from "./utilities/createUpdootLoader";
import { CreateUserLoader } from "./utilities/createUserLoader";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

const main = async () => {
  //sendEmails("bob@b.com","hi");
  const connection = await createConnection({
    type: "postgres",
    url:process.env.DATABASE_URL,
    logging: false,
    //synchronize: __prod__ ? false : true,
    migrations: [path.join(__dirname, "./migrations/*.ts")], //dist/migrations/*.js
    entities: [Post, User, Updoot, Comments],
    ssl: __prod__ ? {
      rejectUnauthorized:false,
    } : false,
  });

  //await connection.runMigrations();
  //await Post.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy",1); //what does this do

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        // host: "localhost", removed on production
        // port: 6379,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookies only work in https
        //domain: __prod__? ".heroku.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver, postResolver, userResolver, commentsResolver],
      validate: false,
    }),
    playground:true,
    introspection:true,
    context: ({ req, res }) => ({
      em: connection.manager,
      req,
      res,
      redis,
      userLoader: CreateUserLoader(),
      updootLoader: CreateUpdootLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/", (_, res) => {
    res.send("hi");
  });

  const port = parseInt(process.env.PORT) || 4000;

  app.listen(port, () => {
    console.log("server running on port 4000");
  });
};

main().catch((err) => {
  console.error("err:",err);
});