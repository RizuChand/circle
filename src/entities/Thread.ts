import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";
import { Replies } from "./Replies";
import { Likes } from "./Likes";


@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ nullable: true })
    image: string


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date;

    @ManyToOne(() => User, (user) => user.threads)
    user: User

    @OneToMany(() => Likes, (like) => like.thread)
    like: Likes[];

    @OneToMany(() => Replies, (reply) => reply.thread)
    replies: Replies[];


}
