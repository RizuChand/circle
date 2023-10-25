import { Request, Response } from "express";
import replies from "../services/replies";

class RepliesController {
    async find(req: Request, res: Response) {
        try {
            const response = await replies.find(req.query);


            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;

            console.log(req.body);
            console.log(loginSession);

            const response = await replies.create(req.body, loginSession);
            console.log("ini reploes", response);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: "error abang 123" });
        }
    }
}

export default new RepliesController();