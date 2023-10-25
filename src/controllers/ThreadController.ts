import { Request, Response } from "express"
import ThreadServices from "../services"


class ThreadController {

    async find(req: Request, res: Response) {
        // ThreadServices.find(req, res)
        try {
            const loginSession = res.locals.loginSession;

            const response = await ThreadServices.find(req.query, loginSession);
            return res.status(200).json(response);
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        // ThreadServices.findOne(req, res)
        try {
            const id = parseInt(req.params.id);
            const loginSession = res.locals.loginSession;

            const response = await ThreadServices.findOne(id, loginSession);
            return res.status(200).json(response);
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
        }
    }


    create(req: Request, res: Response) {
        ThreadServices.create(req, res)
    }
    delete(req: Request, res: Response) {
        ThreadServices.delete(req, res)
    }
    update(req: Request, res: Response) {
        ThreadServices.update(req, res)
    }

}

export default new ThreadController;