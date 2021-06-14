//try to do this with many to many relationship
import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Posts";
import { User } from "./User";

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
    // @Field(()=>Int)
    // @Column({ type:"int" })
    // value: number;

    @PrimaryColumn()
    userId: number;

    @Field(()=>User)
    @ManyToOne(()=>User, user => user.updoots)
    user: User;

    @PrimaryColumn()
    postId: number;
    
    @Field(()=>Post)
    @ManyToOne(()=>Post, post => post.updoots)
    post: Post;
}