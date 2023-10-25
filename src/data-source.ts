import "reflect-metadata"
import { DataSource, Like } from "typeorm"


export const AppDataSource = new DataSource({

    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '0987',
    database: 'thread_db',
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: [],
    subscribers: [],
})
