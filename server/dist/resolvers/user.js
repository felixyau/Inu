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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constant_1 = require("../constant");
const validateUserInput_1 = require("../utilities/validateUserInput");
const registerUserInput_1 = require("./registerUserInput");
const Error_1 = require("./Error");
const uuid_1 = require("uuid");
const sendEmails_1 = require("../utilities/sendEmails");
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [Error_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let userResolver = class userResolver {
    email({ req }, user) {
        if (user.id === req.session.userId) {
            return user.email;
        }
        return "";
    }
    users() {
        return User_1.User.find();
    }
    userProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(id);
            if (!user)
                return null;
            return user;
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId)
                return null;
            return User_1.User.findOne(req.session.userId);
        });
    }
    editUserProfile(id, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(id);
            if (!user)
                return null;
            user.icon = url;
            User_1.User.save(user);
            return user;
        });
    }
    changePassword(token, newPassword, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword.length <= 6) {
                return {
                    errors: [
                        {
                            field: "newPassword",
                            msg: "password must be longer than 6 characters",
                        },
                    ],
                };
            }
            const key = constant_1.FORGET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(key);
            if (!userId)
                return {
                    errors: [
                        {
                            field: "token",
                            msg: "token expired",
                        },
                    ],
                };
            const userIdNum = parseInt(userId);
            const user = yield User_1.User.findOne(userIdNum);
            if (!user) {
                return {
                    errors: [
                        {
                            field: "token",
                            msg: "user doesn't exist",
                        },
                    ],
                };
            }
            yield User_1.User.update({ id: userIdNum }, { password: yield argon2_1.default.hash(newPassword) });
            return { user };
        });
    }
    forgotPassword(useremail, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ email: useremail });
            if (!user)
                return true;
            const TOKEN = uuid_1.v4();
            yield redis.set(constant_1.FORGET_PASSWORD_PREFIX + TOKEN, user.id, "ex", 1000 * 60 * 60 * 24 * 3);
            sendEmails_1.sendEmails(useremail, `<a href=http://localhost:3000/change-password/${TOKEN}>Reset Password<a>`);
            return true;
        });
    }
    register(options, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateUserInput_1.validateUserName(options);
            if (errors)
                return { errors };
            const user = new User_1.User();
            const hashedPassword = yield argon2_1.default.hash(options.password);
            user.username = options.username;
            user.email = options.email;
            user.password = hashedPassword;
            try {
                yield em.save(user);
            }
            catch (err) {
                console.log();
                if (err.code === "23505") {
                    console.log(err.detail);
                    if (err.detail.includes("email")) {
                        return {
                            errors: [
                                {
                                    field: "email",
                                    msg: "email already exists",
                                },
                            ],
                        };
                    }
                    return {
                        errors: [
                            {
                                field: "username",
                                msg: "username already exists",
                            },
                        ],
                    };
                }
                else {
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
            req.session.userId = user.id;
            return { user };
        });
    }
    login(usernameOrEmail, password, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.User, usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
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
            const valid = yield argon2_1.default.verify(user.password, password);
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
            return { user };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constant_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
            }
            resolve(true);
        }));
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Ctx()), __param(1, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_1.User]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "userProfile", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "editUserProfile", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("useremail")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUserInput_1.registerUserInput, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("usernameOrEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "logout", null);
userResolver = __decorate([
    type_graphql_1.Resolver((of) => User_1.User)
], userResolver);
exports.userResolver = userResolver;
//# sourceMappingURL=user.js.map