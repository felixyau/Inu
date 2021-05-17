/*
1. email authentication, now user can register with invalid email, but we can't send email to email with invalid format
2. each post only shows 50 letters
*/
import "reflect-metadata";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constant";
import { Post } from "./entities/Posts";
require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { helloResolver } from "./resolvers/hello";
import { postResolver } from "./resolvers/post";
import { User } from "./entities/User";
import { userResolver } from "./resolvers/user";
import path from "path"

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

import cors from "cors";
import { sendEmails } from "./utilities/sendEmails";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

const main = async () => {
  //sendEmails("bob@b.com","hi");
  const connection = await createConnection({
    type: "postgres",
    database: "postgres",
    logging: true,
    password: "mysql",
    host: "localhost",
    port: 5432,
    username: "postgres",
    //synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User],
  });
  //await Post.delete({});
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        host: "localhost",
        port: 6379,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookies only work in https
      },
      saveUninitialized: false,
      secret: "keyboard cat", //encrypt later
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver, postResolver, userResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: connection.manager, req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors:false });

  app.get("/", (_, res) => {
    res.send("hi");
  });

  app.listen(4000, () => {
    console.log("server running on port 4000");
  });
};

main();
