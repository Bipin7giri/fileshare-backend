import { Router } from "express";
import AuthRouter from "../auth/auth.router";
import AppRouter from '../app/app.router'
const router: Router = Router();
router.use("/auth", AuthRouter);
router.use("/app",AppRouter)

export default router;
