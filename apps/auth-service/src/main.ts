import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "@packages/error-handler/error-midleware";
import router from "./routes/auth.router";
import swaggerUi from "swagger-ui-express";



// let swaggerDocument = {
//   swagger: "2.0",
//   info: {
//     title: "Auth Service",
//     description: "Fallback Swagger",
//     version: "1.0.0",
//   },
//   paths: {}
// };
let swaggerDocument = require("./swagger-output.json")

// Look for swagger-output.json next to compiled main.js
// if (fs.existsSync(swaggerPath)) {
//   swaggerDocument = require(swaggerPath);
//   console.log(" Swagger file loaded from", swaggerPath);
// } else {
//   console.warn(" Swagger file not found, using fallback Swagger doc");
// }

console.log(
  swaggerDocument,
  "=====================================================================docs path", swaggerDocument
);

const app = express();

const host = process.env.HOST ?? "localhost";
const port = Number(process.env.PORT) || 6001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "localhost:6001"],
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

// swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", router);

// error handler LAST
app.use(errorMiddleware);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on("error", (err) => {
  console.error("server error from auth service", err);
});
