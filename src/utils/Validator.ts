class Validator {
  static isEmail(email: string): boolean {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return emailPattern.test(email);
  }

  static validateCredentials(credentials: {
    username: string;
    password: string;
  }): boolean {
    const { username, password } = credentials;

    if (
      !username ||
      !password ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      return false;
    }

    if (!this.isEmail(username)) {
      return false;
    }

    if (username.length < 4 || password.length < 4) {
      return false;
    }

    return true;
  }
}

export { Validator };
