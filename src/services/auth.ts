
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { userLogin, userRegister } from "../utils/joiValidator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


class AuthService {

    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async create(req: Request, res: Response): Promise<Response> {


        try {

            const { username, password, name, email } = req.body

            const { error, value } = userRegister.validate(req.body)

            if (error) {
                return res.status(500).json(
                    {
                        message: error
                    }
                )

            }

            const checkEmail = await this.userRepository.count({
                where: {
                    email: value.email,
                    username: value.username,
                },
            });

            if (checkEmail > 0) {
                return res.status(400).json("Error Email / username sudah ada");
            }
            const encryPass = await bcrypt.hash(password, 10)

            const user = this.userRepository.create(
                {
                    username,
                    name,
                    email,
                    password: encryPass,
                }
            );

            console.log(user);


            const NewUser = await this.userRepository.save(user)


            return res.status(200).json(

                NewUser
            )
        } catch (err) {
            return res.status(500).json({ error: err })

        }
    }


    async login(req: Request, res: Response): Promise<Response> {

        try {

            const { email, password } = req.body

            const { error, } = userLogin.validate(req.body)

            if (error) {
                return res.status(500).json(
                    {
                        message: 'email tidak valid'

                    }
                )

            }

            // const encryPass = await bcrypt.hash(password, 10)

            const user = await this.userRepository.findOne(
                {

                    where: { email }

                }
            );

            // console.log("ini password hash:", user.password);

            if (!user) {
                return res.status(401).json({ message: 'Email dan Password salah' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Email dan Password salah' });
            }

            // console.log('user anda disini :', user);


            const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });


            return res.status(200).json({
                message: 'berhasil login',
                naruto: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    profile_picture: user.profile_picture,
                    email: user.email,
                    description: user.description
                },
                token: token,
            });

        } catch (err) {
            return res.status(500).json({ error: err });
        }

    }

    async checking(req: Request, res: Response) {

        try {

            const loginSession = res.locals.loginSession

            const user = await this.userRepository.findOne(
                {
                    where: {
                        id: loginSession.user.id,
                    },

                    // select: ["id", "email", "username", "name", "password"]
                }
            )

            return res.status(200).json({
                user,
                message: "token is valid"
            })
        } catch (error) {
            return res.status(500).json({
                message: "ini error",
                error
            })
        }
    }



}


export default new AuthService