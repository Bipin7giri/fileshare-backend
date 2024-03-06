import { AuthService } from "./auth.service";
import { type Response, type Request } from "express";
const authService = new AuthService();
export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await authService.register({ email, password, res });
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await authService.login({ email, password, res });
  }
}
