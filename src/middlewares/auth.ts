import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


const authenticate = (req: Request, res: Response, next: NextFunction): Response => {
    const athorizationheader = req.headers.authorization;

    if (!athorizationheader || !athorizationheader.startsWith('Bearer ')) {

        return res.status(401).json({
            Error: 'Belum login'
        })

    }

    const token = athorizationheader.split(' ')[1];

    try {
        const loginSession = jwt.verify(token, 'kodenyabro');

        console.log('ini berada di bagian session :', loginSession);

        res.locals.loginSession = loginSession
        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Token anda salah'
        })
    }


}


export default authenticate