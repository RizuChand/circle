import { Request, Response } from "express";
import like from "../services/like";

class LikeController {
    async create(req: Request, res: Response) {
        try {

            const loginSession = res.locals.loginSession

            console.log("reqbody", loginSession);


            const response = await like.create(req.body, loginSession);
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(
                {
                    error
                }
            )
        }
    }

    async delete(req: Request, res: Response) {
        try {

            const loginSession = res.locals.loginSession
            const threadId = parseInt(req.params.threadId);

            const response = await like.delete(threadId, loginSession);

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}


export default new LikeController();