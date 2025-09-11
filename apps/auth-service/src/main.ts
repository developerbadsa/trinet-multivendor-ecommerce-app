import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../../../packages/error-handler/error-midleware";

const app = express();

const host = process.env.HOST ?? "localhost";
const port = Number(process.env.PORT) || 6001; 

app.use(
  cors({
    origin: ["http://localhost:3000"], 
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send({ message: "Hello API this is from auth api service" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "working better auth server" });
});

// error handler LAST
app.use(errorMiddleware);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on("error", (err) => { 
  
  console.error("server error from auth service", err);
});
