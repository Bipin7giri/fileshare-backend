import bcrypt from "bcrypt";
export async function generateHashPassword(password: any): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
export async function comparePassword(
  dbPassword: string,
  reqPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(reqPassword, dbPassword);
}
