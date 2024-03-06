/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */

import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
export class AuthMiddleware {
  AuthenticationMiddleware(req: any, res: Response, next: NextFunction) {
    let authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      // Remove "Bearer " from the authHeader
      authHeader = authHeader.slice(7, authHeader.length);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!authHeader) {
      return res.status(401).json({
        message: "No access_token found",
      });
    }
    jwt.verify(authHeader, "json_web_token_pw", async (err: any) => {
      try {
        if (Boolean(err))
          return res.status(401).json({
            message: "unauthorized access",
          });
        const currentUser: {
          id: number;
          email: string;
          iat: number;
          exp: number;
        } = getCurrentUser(authHeader);
        req.user = currentUser.id;
        next();
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    });
  }
}
export function getCurrentUser(token: string): any {
  // function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  // }
}
