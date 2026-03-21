import express from "express";
import cors from "cors";
import { env } from "../config/env";
import { logMiddleware } from "../middlewares/log.middleware";
import { errorHandlerMiddleware } from "../middlewares/error-handler.middleware";
import { appRoutes } from "./routes";
import { uploadDir } from "../config/path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/media/", express.static(uploadDir));
app.use(logMiddleware);

app.use(appRoutes);

app.use(errorHandlerMiddleware);

app.listen(env.PORT, env.HOST, () => {
	console.log(`Server is started on: http://${env.HOST}:${env.PORT}`);
});
