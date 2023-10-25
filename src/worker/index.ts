import * as amqp from "amqplib";
import threadWorker from "./threadWorker";
import { AppDataSource } from "../data-source";
import { cloudinaryConfig } from "../libs/cloudinaryConfig";

class WorkerHub {

    constructor() {
        AppDataSource.initialize().
            then(async () => {

                cloudinaryConfig();

                const connection = await amqp.connect("amqp://localhost");
                // register workernya

                threadWorker.create("threads-queue", connection);



            }).catch((error) => {
                console.log("error di index worker", error);

            })
    }
}

export default new WorkerHub();