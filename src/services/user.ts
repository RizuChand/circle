import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";


class UserServices {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userRepository.find(
                // {
                //     // relations: ['user', 'like.user', 'replies.user']

                // }
            );

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ error: "Error mas bro di user" })

        }
    }

    async profile(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userRepository.findOne(
                {
                    where: {
                        id: Number(req.params.id)
                    },
                    relations: ['threads', 'threads.user']

                }
            );

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ error: "Error mas bro di user" })

        }
    }



    async findOne(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id)

        try {
            const user = await this.userRepository.findOne(
                {
                    where: { id: id },
                    // relations: ['user', 'like.user', 'replies.user']

                }
            );

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ error: "Error di detail mas bro di user" })

        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {

        const id = parseInt(req.params.id)
        const { username, name, description } = req.body

        try {
            const userData = await this.userRepository.findOne(
                {
                    where: { id: id },
                    // relations: ['thread', 'like', 'replies', 'follow']

                }
            );

            userData.username = username
            userData.name = name
            userData.description = description
            userData.profile_picture = res.locals.filename

            const NewUserData = await this.userRepository.save(userData)
            return res.status(200).json(
                NewUserData
            )
        } catch (error) {
            return res.status(500).json({ error: "Error mas bro" })

        }
    }
}


export default new UserServices;