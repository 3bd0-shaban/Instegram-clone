import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import router from './Routes/UserRegister&Login.js';

const app = express();
const port = process.env.Port || 5000;

dotenv.config();
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`Started successfully at port http:localhost:${port}`);
    })
}).catch((err) => {
    console.log(err)
})
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin: "http://localhost:3000", //react location
    credentials: true
}))

app.use(express.json())
app.use('/', router);