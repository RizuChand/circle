import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";
import { error } from "console";


class LikeServices {
    private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

    async create(reqBody: any, loginSession: any): Promise<any> {
        // console.log("nuninin", loginSession);
        try {
            const isLiked = await this.likeRepository.count({
                where: {
                    user: {
                        id: loginSession.user.id
                    },
                    thread: {
                        id: reqBody.thread
                    }
                }
            })


            console.log("yoyo", isLiked);

            if (isLiked > 0) {
                throw new Error("anda telah menyukai thread ini!")
            }


            const like = this.likeRepository.create({
                thread: {
                    id: reqBody.thread
                },
                user: {
                    id: loginSession.user.id
                }
            })

            console.log("nnini", like);
            await this.likeRepository.save(like);

            return {
                message: "anda menyukai thread ini!",
                like: like,
            };

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(threadId: number, loginSession: any): Promise<any> {

        try {

            const like = await this.likeRepository.findOne({
                where: {
                    thread: {
                        id: threadId
                    },
                    user: {
                        id: loginSession.user.id
                    }
                }
            })

            if (!like) {
                throw new error("error di dislike!");
            }

            await this.likeRepository.delete({
                id: like.id
            })

            return {
                message: "you unlike this thread",
                like: like
            }
        } catch (error) {
            throw new error("error di si")
        }
    }
}



export default new LikeServices();