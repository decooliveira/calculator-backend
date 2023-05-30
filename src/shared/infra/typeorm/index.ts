import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";
import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { Balance } from "@modules/balance/infra/typeorm/entities/Balance";

//migrations
import { CreateUsers1684263498950 } from "./migrations/1684263498950-CreateUsers";
import { CreateUsersToken1684273768170 } from "./migrations/1684273768170-CreateUsersToken";
import { CreateOperations1684308499155 } from "./migrations/1684308499155-CreateOperations";
import { CreateRecords1684379916271 } from "./migrations/1684379916271-CreateRecords";
import { CreateBalance1684448539120 } from "./migrations/1684448539120-CreateBalance";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  entities: [User, UserTokens, Operation, Record, Balance],
  logging: true,

  migrations: [
    CreateUsers1684263498950,
    CreateUsersToken1684273768170,
    CreateOperations1684308499155,
    CreateRecords1684379916271,
    CreateBalance1684448539120,
  ],
});

dataSource
  .initialize()
  .then(() => {
    console.log("The app datasource has been successfully initialized.");
  })
  .catch((error) => {
    console.log(error);
  });
