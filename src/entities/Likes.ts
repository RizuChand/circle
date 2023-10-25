import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Thread } from "./Thread";
import { User } from "./User";


@Entity({ name: "like" })
export class Likes {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.like)
    user: User;

    @ManyToOne(() => Thread, (threads) => threads.like)
    thread: Thread;
}