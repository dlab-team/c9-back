require('dotenv').config();
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"
import { SeederOptions } from "typeorm-extension";
import { Publication } from "./entity/Publication";
import { MainSeeder } from "./seeds/MainSeeder";


const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entity/*.ts`],
    migrations: [`${__dirname}/**/migrations/*.ts`],
    seeds: [MainSeeder],
    subscribers: [],
}

export const AppDataSource = new DataSource(options)