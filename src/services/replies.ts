import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Replies } from "../entities/Replies";


class RepliesService {
    private readonly repliesRepository: Repository<Replies> =
        AppDataSource.getRepository(Replies);

    async find(reqQuery: any): Promise<any> {
        try {
            const threadId = parseInt(reqQuery.threadId ?? 0);

            const replies = await this.repliesRepository.find({
                relations: ["user"],
                where: {
                    thread: {
                        id: threadId,
                    },
                },
                order: {
                    id: "DESC",
                },
            });

            console.log("ini reoiodaka", replies);

            return replies;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(reqBody: any, loginSession: any): Promise<any> {
        // console.log("inireq", reqBody);
        // console.log("iniloggin", loginSession);

        try {
            const reply = this.repliesRepository.create({
                content: reqBody.content,
                user: {
                    id: loginSession.user.id,
                },
                thread: {
                    id: reqBody.threadId,
                },
            });

            console.log("ini replijijii", reply);

            await this.repliesRepository.save(reply);

            return {
                message: "berhasil di reply"
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new RepliesService();
