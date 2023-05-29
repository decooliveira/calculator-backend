import { v4 as uuidV4 } from "uuid";
import { dataSource } from "@shared/infra/typeorm";

function generateId() {
  return uuidV4();
}

async function create() {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.query(`
  DELETE FROM operations
  WHERE EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'operations'
  );`);

  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','addition', 2);`
  );
  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','subtraction', 4);`
  );
  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','multiplication', 6);`
  );
  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','division', 8);`
  );
  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','square_root', 12);`
  );
  await queryRunner.query(
    `INSERT INTO operations(id, type, cost) VALUES('${generateId()}','random_string', 20);`
  );

  dataSource.destroy();
}
create()
  .then(() => {
    console.log("Operation records have been created successfully");
  })
  .catch((error) => {
    console.log(error);
  });
