import express from 'express';
import { errorMiddleware } from '../../../packages/error-handler/error-midleware';
import cookieParser from "cookie-parser";

const host = process.env.HOST ?? 'localhost';
const port =  6001;
import cors from "cors";
const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000/"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send({ message: 'Hello API this is from auth api service'});
});

app.use(errorMiddleware)



app.get('/testing', (req, res) => {
    res.send({ message: 'testing'});
});

const server = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});


server.on("error", (err)=>{

    console.log(" server error", err)
})