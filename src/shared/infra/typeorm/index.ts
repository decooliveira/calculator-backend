import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";
import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { Balance } from "@modules/balance/infra/typeorm/entities/Balance";

//migrations
import { CreateUsers1684263498950 } from "./migrations/1684263498950-CreateUsers";
import { CreateOperations1684308499155 } from "./migrations/1684308499155-CreateOperations";
import { CreateRecords1684379916271 } from "./migrations/1684379916271-CreateRecords";
import { CreateBalance1684448539120 } from "./migrations/1684448539120-CreateBalance";
import { CreateTokensTable1686114435472 } from "./migrations/1686114435472-CreateTokensTable";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  entities: [User, UserToken, Operation, Record, Balance],
  logging: true,

  migrations: [
    CreateUsers1684263498950,
    CreateOperations1684308499155,
    CreateRecords1684379916271,
    CreateBalance1684448539120,
    CreateTokensTable1686114435472,
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
