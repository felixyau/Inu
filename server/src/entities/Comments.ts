import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Post } from "./Posts";
import { Updoot } from "./Updoot";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comments extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    text!: string;

    // @Field()
    // @Column({default:0,type:"int"})
    // points!: number;

    @Field()
    @Column()
    userId: number; 

    @Field(()=>User)
    @ManyToOne(()=>User, user => user.comments)
    user:User;

    @Field()
    @Column()
    postId: number; 

    @Field(()=>Post)
    @ManyToOne(()=>Post, post => post.comments)
    post:Post;
    
    @Field(()=>String)
    @UpdateDateColumn()
    updatedAt : Date;
    
    @Field(()=>String)
    @CreateDateColumn()
    createdAt : Date;
}