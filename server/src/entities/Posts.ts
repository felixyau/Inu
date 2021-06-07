import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany,  } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Updoot } from "./Updoot";
import {  Comments } from "./Comments"

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column({default:0,type:"int"})
    points!: number;

    @Field()
    voteStatus: boolean

    @Field()
    @Column()
    creatorId: number; 

    @OneToMany(()=>Updoot, updoot => updoot.post)
    updoots: Updoot[];

    @OneToMany(()=>Comments, comments => comments.post)
    comments: Comments[]

    @Field()
    @ManyToOne(()=>User, user => user.posts)
    creator:User;
    
    @Field(()=>String)
    @UpdateDateColumn()
    updatedAt : Date;
    
    @Field(()=>String)
    @CreateDateColumn()
    createdAt : Date;
}