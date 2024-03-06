import { Router } from "express";
import { AppController } from "./app.controller";
import { upload } from "../middleware/fileUpload.middleware";

const router = Router();
const appController = new AppController();
router.post("/", appController.post);
router.post("/upload", upload.single("file"), appController.uploadFile);

export default router;
