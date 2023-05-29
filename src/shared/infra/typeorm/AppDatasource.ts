import { DataSource } from "typeorm";
import { dataSource } from ".";
import { IAppDatasource } from "./IAppDataSource";

class AppDatasource implements IAppDatasource {
  constructor() {}

  get(): DataSource {
    return dataSource;
  }
}
export { AppDatasource };
