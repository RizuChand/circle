import { Request, Response } from "express"
import user from "../services/user"


class UserController {

    find(req: Request, res: Response) {
        user.find(req, res)
    }

    findOne(req: Request, res: Response) {
        user.findOne(req, res)
    }
    profile(req: Request, res: Response) {
        user.profile(req, res)
    }
    update(req: Request, res: Response) {
        user.updateUser(req, res)
    }

}


export default new UserController;