import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";


@Entity({ name: "follows" })
export class Follows {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followings, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    follower: User;

    @ManyToOne(() => User, (user) => user.followers, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followed: User;


}