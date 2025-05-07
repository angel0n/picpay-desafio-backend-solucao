import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD?.toString(),
    database: process.env.TYPEORM_DATABASE,
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
})