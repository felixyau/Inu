"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = exports.PaginatedPost = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Comments_1 = require("../entities/Comments");
const Posts_1 = require("../entities/Posts");
const Updoot_1 = require("../entities/Updoot");
const User_1 = require("../entities/User");
const isAuth_1 = require("../middleware/isAuth");
const tryCatchHell_1 = require("../utilities/tryCatchHell");
const Error_1 = require("./Error");
let postInput = class postInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], postInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], postInput.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], postInput.prototype, "photo", void 0);
postInput = __decorate([
    type_graphql_1.InputType()
], postInput);
let PaginatedPost = class PaginatedPost {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedPost.prototype, "hasMore", void 0);
__decorate([
    type_graphql_1.Field(() => [Posts_1.Post]),
    __metadata("design:type", Array)
], PaginatedPost.prototype, "posts", void 0);
PaginatedPost = __decorate([
    type_graphql_1.ObjectType()
], PaginatedPost);
exports.PaginatedPost = PaginatedPost;
let PostResponse = class PostResponse {
};
__decorate([
    type_graphql_1.Field(() => [Error_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], PostResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Posts_1.Post, { nullable: true }),
    __metadata("design:type", Posts_1.Post)
], PostResponse.prototype, "post", void 0);
PostResponse = __decorate([
    type_graphql_1.ObjectType()
], PostResponse);
let postResolver = class postResolver {
    comments(post, limit, duplicateUserComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield typeorm_1.getConnection().query(`
      SELECT c.*
      FROM comments c
      WHERE c."postId" = ${post.id} 
      ${duplicateUserComment ? `WHERE c."userId" <> ${duplicateUserComment} ` : ""}
      ORDER BY c."createdAt" DESC
      ${limit ? `limit ${limit}` : ""}
      `);
            if (!comments)
                return null;
            return comments;
        });
    }
    creator(post, { userLoader }) {
        return userLoader.load(post.creatorId);
    }
    voteStatus(post, { req, updootLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId)
                return false;
            const updoot = yield updootLoader.load({
                postId: post.id,
                userId: req.session.userId,
            });
            console.log("updoot:", updoot);
            return !!updoot;
        });
    }
    posts(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const reallimit = Math.min(50, limit);
            const reallimitPlusOne = reallimit + 1;
            const replacements = [reallimitPlusOne];
            if (cursor) {
                replacements.push([new Date(parseInt(cursor))]);
            }
            const posts = yield typeorm_1.getConnection().query(` 
      SELECT p.*
      FROM post p
      ${cursor ? `where p."createdAt" < $2 ` : ""}
      ORDER BY p."createdAt" DESC
      limit $1
    `, replacements);
            return {
                hasMore: posts.length === reallimitPlusOne,
                posts: posts.slice(0, reallimit),
            };
        });
    }
    post(id) {
        return Posts_1.Post.findOne(id);
    }
    addComment(text, postId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [_, error] = yield tryCatchHell_1.tryCatchHell(Posts_1.Post.findOne(postId));
            if (error)
                return null;
            const comment = yield Comments_1.Comments.create({
                text,
                userId: req.session.userId,
                postId,
            }).save();
            console.log("comment:", comment);
            return comment;
        });
    }
    vote(postId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const updoot = yield Updoot_1.Updoot.findOne({ postId, userId });
            if (updoot) {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
        DELETE FROM  updoot
        WHERE "postId" = $1 and "userId" = $2
        `, [postId, userId]);
                    yield tm.query(`
        UPDATE post 
        SET points = points - 1
        WHERE id = $1
        `, [postId]);
                }));
            }
            else {
                yield typeorm_1.getConnection().transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
        INSERT INTO updoot ("userId","postId")
        VALUES ($1,$2);`, [userId, postId]);
                    yield tm.query(`
        UPDATE post
        SET points = points + 1
        WHERE id = $1;
        `, [postId]);
                }));
            }
            return true;
        });
    }
    createPost(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            console.log("req user:", req.session.userId);
            const post = yield Posts_1.Post.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
            return { post };
        });
    }
    updatePost(id, title, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Posts_1.Post.findOne(id);
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
            post.title = title;
            post.text = text;
            yield Posts_1.Post.update({ id }, { text, title });
            return { post };
        });
    }
    deletePost(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Posts_1.Post.findOne(id);
            if (!post)
                return false;
            yield Comments_1.Comments.delete({ postId: id });
            const userId = req.session.userId;
            if (post.creatorId !== userId)
                return false;
            yield Updoot_1.Updoot.delete({ postId: id });
            yield Posts_1.Post.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => [Comments_1.Comments], { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("limit", () => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Arg("duplicateUserComment", () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Posts_1.Post, Number, Number]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "comments", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Posts_1.Post, Object]),
    __metadata("design:returntype", void 0)
], postResolver.prototype, "creator", null);
__decorate([
    type_graphql_1.FieldResolver(() => Boolean, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Posts_1.Post, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "voteStatus", null);
__decorate([
    type_graphql_1.Query(() => PaginatedPost),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Query(() => Posts_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Mutation(() => Comments_1.Comments, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("text")),
    __param(1, type_graphql_1.Arg("postId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "addComment", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("postId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "vote", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postInput, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("title", () => String, { nullable: true })),
    __param(2, type_graphql_1.Arg("text", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "updatePost", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], postResolver.prototype, "deletePost", null);
postResolver = __decorate([
    type_graphql_1.Resolver(Posts_1.Post)
], postResolver);
exports.postResolver = postResolver;
//# sourceMappingURL=post.js.map