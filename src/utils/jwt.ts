import jwt from "jsonwebtoken";
export async function generateToken(user: any, expire?: any): Promise<any> {
  try {
    return jwt.sign(
      {
        // email: user.email,
        id: user.id,
        email: user.email,
      },
      "json_web_token_pw",
      {
        expiresIn: "11h",
      },
    );
  } catch (err: any) {
    console.log(err);
  }
}
