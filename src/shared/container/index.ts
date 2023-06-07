import { container } from "tsyringe";
import { OperationRepository } from "@modules/balance/repositories/OperationRepository";
import { IOperationRepository } from "@modules/balance/repositories/IOperationRepository";
import { IRecordsRepository } from "@modules/records/repositories/IRecordsRepository";
import { RecordsRepository } from "@modules/records/repositories/RecordsRepository";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";
import { BalanceRepository } from "@modules/balance/repositories/BalanceRepository";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppDatasource } from "@shared/infra/typeorm/AppDatasource";
import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { UserTokenRepository } from "@modules/accounts/repositories/UserTokenRepository";

container.registerSingleton<IOperationRepository>(
  "OperationRepository",
  OperationRepository
);

container.registerSingleton<IRecordsRepository>(
  "RecordsRepository",
  RecordsRepository
);

container.registerSingleton<IBalanceRepository>(
  "BalanceRepository",
  BalanceRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);

container.registerSingleton<IAppDatasource>("AppDatasource", AppDatasource);
