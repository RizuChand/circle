import * as amqp from "amqplib";



export async function sendMessageQueue(queName: string, payload: any): Promise<boolean> {

    try {

        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue(queName);

        channel.sendToQueue(queName, Buffer.from(JSON.stringify(payload)));

        await channel.close();

        await connection.close();


        return null;

    } catch (error) {
        return error;
    }
}
