import { DataSource } from "typeorm";

const port = process.env.PORT as number | undefined;

export const AppDataSourse = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})