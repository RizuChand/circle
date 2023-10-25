import { Request, Response } from "express";
import follows from "../services/follows";

class FollowsController {
    async find(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const limit = (req.query.limit ?? 0) as number;
            const type = (req.query.type ?? "") as string;

            const response = await follows.find(loginSession, type, limit);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;

            const response = await follows.create(req.body, loginSession);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const followedUserId = parseInt(req.params.followed_user_id);

            const response = await follows.delete(
                followedUserId,
                loginSession
            );
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new FollowsController();