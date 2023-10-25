import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Thread } from "./Thread";
import { User } from "./User";


@Entity({ name: "replies" })
export class Replies {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.replies)
    user: User;


    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread;

}