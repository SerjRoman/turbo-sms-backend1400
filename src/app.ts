import express, { type Express } from "express";
import cors from "cors";
import { env } from "./config/env";

const app: Express = express();
app.use(cors({ origin: "" }));

app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(env.PORT, env.HOST, () => {
	console.log(`Server started on http://${env.HOST}:${env.PORT}`);
});
