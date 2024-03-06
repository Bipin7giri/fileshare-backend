// decorators.ts

import { type Request, type Response } from "express";

export function logRequestHeaders(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
): any {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    ...args: any[]
  ) {
    console.log("Request Headers:", req.headers);
    return originalMethod.call(this, req, res, ...args);
  };

  // Return the modified descriptor
  return descriptor;
}
