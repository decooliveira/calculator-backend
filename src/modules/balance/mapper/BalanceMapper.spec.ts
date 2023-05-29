import { BalanceMapper } from "./BalanceMapper";
import { Balance } from "../infra/typeorm/entities/Balance";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

describe("BalanceMapper", () => {
  describe("toDTO", () => {
    it("should map Balance entity to BalanceDTO", () => {
      const user: User = {
        id: "user-id",
        username: "user-test",
        password: "password-test",
        status: "active",
        createdAt: new Date(),
      };
      const balance: Balance = {
        id: "1",
        userId: "user-id",
        amount: 100,
        createdAt: new Date(),
        user,
      };

      const expectedDTO = { amount: 100 };

      const result = BalanceMapper.toDTO(balance);

      expect(result).toEqual(expectedDTO);
    });
  });
});
