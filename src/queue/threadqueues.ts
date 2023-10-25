import { Request, Response } from "express";
import { sendMessageQueue } from "../libs/rabbitMq";


class ThreadQueue {
    async create(req: Request, res: Response) {
        try {
            const filename = res.locals.filename
            const queName = "threads-queue"

            const datanya = {
                content: req.body.content,
                image: filename
            }

            const loginSession = res.locals.loginSession;

            const payload = {

                content: datanya.content,
                image: datanya.image,
                user_id: loginSession.user.id
            };

            const errQueue = await sendMessageQueue(queName, payload);

            if (errQueue) {
                return res.status(500).json({
                    error: errQueue
                })
            }

            res.status(200).json({
                message: 'thread terantri bos',
                datanya: payload
            })

        } catch (error) {
            console.log("error di queue bos");
            res.status(500).json({
                error: 'terjadi error di queue server'
            })

        }
    }
}


export default new ThreadQueue();