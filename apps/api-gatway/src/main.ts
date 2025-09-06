import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import axios from "axios";
import cookieParser from "cookie-parser";
const app = express();


const port = Number(process.env.PORT) || 8080;      // local: 8080; Render sets PORT
const AUTH_HOSTPORT = process.env.AUTH_HOSTPORT || "localhost:6001"; // internal URL on Render

app.use(
  cors({
    origin: ["http://localhost:3000/"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

// applying rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: {
    error: "Too many request! try again later",
  },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => ipKeyGenerator(req.ip),
});
app.use(limiter);

app.get("/gatway-health", (req, res) => {
  res.send({ message: " welcome to api gatway" });
});

app.use("/", proxy("http://localhost:6001"));

const server = app.listen(port,"0.0.0.0", () => {
  console.log(`Listening proxy at http://localhost:${port}/api`);
});
server.on("error", console.error);
