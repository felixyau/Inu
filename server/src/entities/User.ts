import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany  } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Post } from "./Posts";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({unique: true})
    username!: string;

    @Field()
    @Column({unique: true, nullable:true})
    email: string;

    @OneToMany(()=>Post, post => post.creator)
    posts: Post[]

    @Column()
    password!: string;
    
    @Field(()=>String)
    @UpdateDateColumn()
    updatedAt : Date;
    
    @Field(()=>String)
    @CreateDateColumn()
    createdAt : Date;
}