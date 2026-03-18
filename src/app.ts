import express from "express";
import cors from "cors";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: Date.now(),
	});
});

app.listen(env.PORT, env.HOST, () => {
	console.log(`Server is started on: http://${env.HOST}:${env.PORT}`);
});
