import { type Request, type Response, type NextFunction } from "express";
import { ApiResponseHandler } from "./apiResponse.utils";

export const asyncHandler = (
  fn: (req: Request, res: Response) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error("Error caught in asyncHandler:", error);
      ApiResponseHandler.handleError(res, 500, "Internal Server Error");
    }
  };
};
