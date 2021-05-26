import {Request, Response} from "express";
import { Redis } from "ioredis";
import { EntityManager } from "typeorm";
import { CreateUpdootLoader } from "./utilities/createUpdootLoader";
import { CreateUserLoader } from "./utilities/createUserLoader";

export type MyContext = {
    em: EntityManager,
    req: Request,
    res: Response,
    redis: Redis,
    userLoader: ReturnType<typeof CreateUserLoader>
    updootLoader: ReturnType<typeof CreateUpdootLoader>
}