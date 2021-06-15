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
exports.commentsResolver = exports.usernameAndId = void 0;
const type_graphql_1 = require("type-graphql");
const Comments_1 = require("../entities/Comments");
const User_1 = require("../entities/User");
let usernameAndId = class usernameAndId {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], usernameAndId.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], usernameAndId.prototype, "userId", void 0);
usernameAndId = __decorate([
    type_graphql_1.ObjectType()
], usernameAndId);
exports.usernameAndId = usernameAndId;
let commentsResolver = class commentsResolver {
    commentor(comments) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(comments.userId);
            if (!user)
                return null;
            return user;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comments_1.Comments]),
    __metadata("design:returntype", Promise)
], commentsResolver.prototype, "commentor", null);
commentsResolver = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.Resolver((of) => Comments_1.Comments)
], commentsResolver);
exports.commentsResolver = commentsResolver;
//# sourceMappingURL=comments.js.map