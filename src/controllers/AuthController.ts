import { Request, Response } from "express"
import AuthService from '../services/auth'

class AuthController {

    create(req: Request, res: Response) {
        AuthService.create(req, res)
    }
    login(req: Request, res: Response) {
        AuthService.login(req, res)
    }
    checking(req: Request, res: Response) {
        AuthService.checking(req, res)
    }


}

export default new AuthController;