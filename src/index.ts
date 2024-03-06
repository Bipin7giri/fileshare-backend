import express, { type Request, type Response } from "express";
import RouteRouter from "./api/api";
import cors from "cors";
import { socketInt } from "./socket/socket.service";

const app = express();
const server = socketInt(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// startCronJob();
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "server is running fine",
    endpoint: {
      company: {
        get: "/",
      },
    },
  });
});
app.use("/api/v1", RouteRouter);

server.listen(8000, () => {
  console.log("server listening on port" + 8000);
});
