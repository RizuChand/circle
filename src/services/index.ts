import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/Thread";
import like from "./like";



class ThreadServices {

    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);



    async find(reqQuery?: any, loginSession?: any): Promise<any> {
        try {
            const threads = await this.threadRepository.find(
                {
                    relations: ['user', 'like.user', 'replies.user'],
                    order: {
                        id: "DESC",
                    },

                }
            );

            // return res.status(200).json(threads.sort((a, b) => (b.id - a.id)));
            return threads.map((element) => ({
                id: element.id,
                content: element.content,
                image: element.image,
                posted_at: element.posted_at,
                user: element.user,
                repiles_count: element.replies.length,
                liked_count: element.like.length,
                is_liked: element.like.some(
                    (like: any) => like.user.id === loginSession.user.id
                ),
            }));

        } catch (error) {
            // return res.status(500).json({ error: "Error mas bro" })
            throw new Error("error di loke")

        }
    }

    async findOne(id: number, loginSession?: any): Promise<any> {

        // const id = parseInt(req.params.id)

        try {
            const threads = await this.threadRepository.findOne(
                {
                    where: { id: id },
                    relations: ['user', 'like.user', 'replies.user']

                }
            );

            // return res.status(200).json(threads)
            console.log("jhskahdk", threads.like.length);


            return {
                id: threads.id,
                content: threads.content,
                image: threads.image,
                posted_at: threads.posted_at,
                user: threads.user,
                repiles_count: threads.replies.length,
                liked_count: threads.like.length,
                is_liked: threads.like.some(
                    (like: any) => like.user.id === loginSession.user.id
                )
            }
        } catch (error) {
            // return res.status(500).json({ error: "Error di detail mas bro" })
            throw new Error("error di unloke")


        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id)

        try {
            const threads = await this.threadRepository.findOne(
                {
                    where: { id: id },
                    relations: ['user', 'like', 'replies']
                }
            );

            await this.threadRepository.remove(threads)

            return res.status(200).json(
                {
                    message: "berhasil di hapus"
                }
            )
        } catch (error) {
            return res.status(500).json({ error: "Error mas bro" })

        }
    }
    async update(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id)
        const { content } = req.body


        const logginSesion = res.locals.loginSession

        const userProfile = logginSesion.user


        // console.log("ini mau di update bang", image);
        console.log("ini mau di update bang", content);

        try {
            const threadData = await this.threadRepository.findOne(
                {
                    where: { id: id },
                    relations: ['user', 'like', 'replies']

                }
            );

            threadData.content = content
            threadData.image = res.locals.filename
            const NewThreadData = await this.threadRepository.save(threadData)
            return res.status(200).json(
                NewThreadData
            )
        } catch (error) {
            return res.status(500).json({ error: "Error mas bro" })

        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        const { content } = req.body

        // console.log("ini datanya bos", res.locals.filename);

        const logginSesion = res.locals.loginSession

        console.log("ini dari loggin session", logginSesion);

        const user = logginSesion.user

        try {
            const threads = this.threadRepository.create(
                {
                    content,
                    image: res.locals.filename,
                    user: user
                }
            );
            const NewThread = await this.threadRepository.save(threads)

            return res.status(200).json(NewThread)
        } catch (error) {
            return res.status(500).json({ error: "Error mas bro" })

        }
    }


}




export default new ThreadServices;