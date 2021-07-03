"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constant_1 = require("./constant");
const Comments_1 = require("./entities/Comments");
const Posts_1 = require("./entities/Posts");
const Updoot_1 = require("./entities/Updoot");
const User_1 = require("./entities/User");
const comments_1 = require("./resolvers/comments");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const createUpdootLoader_1 = require("./utilities/createUpdootLoader");
const createUserLoader_1 = require("./utilities/createUserLoader");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: false,
        synchronize: constant_1.__prod__ ? false : true,
        migrations: [path_1.default.join(__dirname, "./migrations/*.ts")],
        entities: [Posts_1.Post, User_1.User, Updoot_1.Updoot, Comments_1.Comments],
        ssl: constant_1.__prod__ ? {
            rejectUnauthorized: false,
        } : false,
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constant_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constant_1.__prod__,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.helloResolver, post_1.postResolver, user_1.userResolver, comments_1.commentsResolver],
            validate: false,
        }),
        playground: true,
        introspection: true,
        context: ({ req, res }) => ({
            em: connection.manager,
            req,
            res,
            redis,
            userLoader: createUserLoader_1.CreateUserLoader(),
            updootLoader: createUpdootLoader_1.CreateUpdootLoader(),
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
});
main().catch((err) => {
    console.error("err:", err);
});
//# sourceMappingURL=index.js.map