interface ICreateUserDTO {
  username: string;
  password: string;
  status?: "active" | "inactive";
  id?: string;
}

export { ICreateUserDTO };
