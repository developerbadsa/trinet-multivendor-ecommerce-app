import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import cookieParser from "cookie-parser";

const app = express();

const port = Number(process.env.PORT) || 8080; // local default 8080
const authServiceUrl = process.env.AUTH_HOSTPORT || "http://localhost:6001";

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:6001"], // no trailing slash
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req?.user ? 1000 : 100),
  message: { error: "Too many request! try again later" },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => ipKeyGenerator(req.ip),
});
app.use(limiter);

app.get("/gateway-health", (_req, res) => {
  res.send({ message: "welcome to api gateway heath" });
});

// Proxy everything else to auth-service by default (adjust prefix if you want)
app.use("/", proxy(`${authServiceUrl}`));

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Gateway listening at http://localhost:${port}`);
});
server.on("error", console.error);
