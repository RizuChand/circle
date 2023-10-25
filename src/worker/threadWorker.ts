import * as amqp from "amqplib";
import { v2 as cloudinary } from "cloudinary";
import { EventEmitter } from "stream";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";


class ThreadWorker {

    // public emmitter = new EventEmitter();

    async create(queName: string, connection: amqp.Connection) {
        try {

            const channel = await connection.createChannel();

            await channel.assertQueue(queName);
            await channel.consume(queName, async (message) => {
                if (message !== null) {
                    try {
                        const payload = JSON.parse(message.content.toString());
                        console.log("pesan anda diterima bos!", payload);

                        const cloudinaryRes = await cloudinary.uploader.upload(
                            "./uploads/" + payload.image
                        );

                        const thread = AppDataSource.getRepository(Thread).create({
                            content: payload.content,
                            image: cloudinaryRes.secure_url,
                            user: {
                                id: payload.user_id
                            }
                        });

                        await AppDataSource.getRepository(Thread).save(thread);

                        // this.emmitter.emit("message");

                        console.log("thread telah dibuat!");

                        channel.ack(message);


                    } catch (error) {
                        console.log("proses anda gagal dengan error : ", error);

                    }
                }
            })
        } catch (error) {
            console.log("error dalam mengambil antrian", error);

        }
    }
}

export default new ThreadWorker();