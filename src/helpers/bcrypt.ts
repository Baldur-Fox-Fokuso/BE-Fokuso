import bcrypt from "bcrypt";

export const hashPass = (password: string) => bcrypt.hashSync(password, 10);
export const comparePass = (password: string, hashedPass: string) =>
  bcrypt.compareSync(password, hashedPass);
