import { DataSource } from "typeorm";
import { dataSource } from ".";

interface IAppDatasource {
  get(): DataSource;
}
export { IAppDatasource };
