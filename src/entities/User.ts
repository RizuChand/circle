import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { Thread } from "./Thread"
import { Replies } from "./Replies"
import { Follows } from "./Follows"
import { Likes } from "./Likes"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    name: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ nullable: true })
    profile_picture: string

    @Column({ nullable: true })
    description: string

    @OneToMany(() => Thread, (thread) => thread.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    threads: Thread[];
    // threads: Thread[]
    // follow: Follows[]
    // like: Likes[]
    // @OneToMany(() => Thread, (thread) => thread.user, {
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE",
    //   })

    @OneToMany(() => Thread, (thread) => thread.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    like: Likes[];

    @OneToMany(() => Follows, (follow) => follow.followed, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followers: Follows[];

    @OneToMany(() => Follows, (follow) => follow.follower, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    followings: Follows[];

    @OneToMany(() => Replies, (reply) => reply.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    replies: Replies[]


}
