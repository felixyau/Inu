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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const constant_1 = require("./constant");
const Posts_1 = require("./entities/Posts");
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const User_1 = require("./entities/User");
const user_1 = require("./resolvers/user");
const path_1 = __importDefault(require("path"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        database: "postgres",
        logging: true,
        password: "mysql",
        host: "localhost",
        port: 5432,
        username: "postgres",
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Posts_1.Post, User_1.User],
    });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(express_session_1.default({
        name: constant_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
            host: "localhost",
            port: 6379,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constant_1.__prod__,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.helloResolver, post_1.postResolver, user_1.userResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: connection.manager, req, res, redis }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.get("/", (_, res) => {
        res.send("hi");
    });
    app.listen(4000, () => {
        console.log("server running on port 4000");
    });
});
main();
//# sourceMappingURL=index.js.map