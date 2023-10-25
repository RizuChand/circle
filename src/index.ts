import * as express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import routes from './router'
import * as dotenv from 'dotenv';
dotenv.config();
var cors = require('cors')
var app = express()

app.use(cors())

AppDataSource.initialize()
    .then(async () => {

        const port = 2000;

        app.use(express.json());
        app.use("/api/v1", routes);


        app.get('/', home)


        app.listen(port, () => {
            console.log(`server run on port ${port}`);

        })
    })
    .catch((error) => {
        console.log(error);

    })

function home(req: Request, res: Response) {
    res.send("hai broh ini home")
}