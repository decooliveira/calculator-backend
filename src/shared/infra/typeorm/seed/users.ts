import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import { dataSource } from "@shared/infra/typeorm";

function generateId() {
  return uuidV4();
}
async function create() {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.query(`
  DELETE FROM users
  WHERE EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'users'
  );`);

  const password = await hash("admin", 0);
  const userId = generateId();
  const balanceId = generateId();

  await queryRunner.query(
    `INSERT INTO users(id, username, password, status, created_at) VALUES('${userId}','admin@demo.com', '${password}','active','now()');`
  );

  await queryRunner.query(
    `INSERT INTO balances(id, user_id, amount, created_at) VALUES('${balanceId}','${userId}', '200','now()');`
  );

  dataSource.destroy();
}
create()
  .then(() => {
    console.log("User records have been created successfully");
  })
  .catch((error) => {
    console.log(error);
  });
