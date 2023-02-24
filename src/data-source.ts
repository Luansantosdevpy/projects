import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { Project } from './entities/projects';
import { User } from './entities/user';

const port = process.env.POSTGRES_PORT as number | undefined;

export const AppDataSourse = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: port,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Project],
	migrations: ['./src/migrations/*{.ts, .js}'],
})