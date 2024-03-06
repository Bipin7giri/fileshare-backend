import { type Response } from "express";

export class ApiResponseHandler {
  // Static method to handle success response
  static handleSuccess<T>(res: Response, data: T): void {
    res.status(200).json({ success: true, data });
  }

  // Static method to handle error response
  static handleError(res: Response, statusCode: number, message: string): void {
    res.status(statusCode).json({ success: false, error: message });
  }

  // Method to handle unauthorized (401) response
  static handleUnauthorized(res: Response, message: string): void {
    ApiResponseHandler.handleError(res, 401, message);
  }

  // Method to handle unprocessable entity (422) response
  static handleUnprocessableEntity(res: Response, message: string): void {
    ApiResponseHandler.handleError(res, 422, message);
  }

  // Method to handle bad gateway (502) response
  static handleBadGateway(res: Response, message: string): void {
    ApiResponseHandler.handleError(res, 502, message);
  }

  // Method to handle internal server error (500) response
  static handleInternalServerError(res: Response, message: string): void {
    ApiResponseHandler.handleError(res, 500, message);
  }
}
