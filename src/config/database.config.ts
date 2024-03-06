import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { UserCredential } from "../users/UserCredential.entities";
import { User } from "../users/user.entity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  // url: "postgres://Bipin7giri:OdiAVjMr82PJ@ep-orange-voice-022920.us-east-2.aws.neon.tech/broker?sslmode=require",
  url: process.env.DATABASE_URL,
  synchronize: true,
  // logging: true,
  entities: [
    UserCredential,
    User,
  ],
  migrations: [],
  subscribers: [],
});
