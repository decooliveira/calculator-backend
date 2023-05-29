import { Validator } from "./Validator";

describe("Validator", () => {
  describe("isEmail", () => {
    it("should return true for valid email addresses", () => {
      expect(Validator.isEmail("example@example.com")).toBe(true);
      expect(Validator.isEmail("john.doe@example.co.uk")).toBe(true);
      expect(Validator.isEmail("test123@test.com")).toBe(true);
    });

    it("should return false for invalid email addresses", () => {
      expect(Validator.isEmail("example")).toBe(false);
      expect(Validator.isEmail("john.doe@example")).toBe(false);
      expect(Validator.isEmail("test123@test")).toBe(false);
    });
  });

  describe("validateCredentials", () => {
    it("should return true for valid credentials", () => {
      const credentials = {
        username: "example@example.com",
        password: "password123",
      };
      expect(Validator.validateCredentials(credentials)).toBe(true);
    });

    it("should return false for null or empty values", () => {
      const credentials = {
        username: "",
        password: "password123",
      };
      expect(Validator.validateCredentials(credentials)).toBe(false);

      credentials.username = "example@example.com";
      credentials.password = "";
      expect(Validator.validateCredentials(credentials)).toBe(false);

      credentials.username = "";
      credentials.password = "";
      expect(Validator.validateCredentials(credentials)).toBe(false);
    });

    it("should return false for invalid email addresses", () => {
      const credentials = {
        username: "example",
        password: "password123",
      };
      expect(Validator.validateCredentials(credentials)).toBe(false);

      credentials.username = "john.doe@example";
      expect(Validator.validateCredentials(credentials)).toBe(false);

      credentials.username = "test123@test";
      expect(Validator.validateCredentials(credentials)).toBe(false);
    });

    it("should return false for credentials with insufficient length", () => {
      const credentials = {
        username: "exa",
        password: "pass",
      };
      expect(Validator.validateCredentials(credentials)).toBe(false);

      credentials.username = "example@example.com";
      credentials.password = "pwd";
      expect(Validator.validateCredentials(credentials)).toBe(false);
    });
  });
});
