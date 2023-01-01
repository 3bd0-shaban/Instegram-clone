import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieparser from 'cookie-parser';
import fileupload from 'express-fileupload';
import errorMiddleware from './Middlewares/Error.js';
import router from './Routes/AuthRoute.js';
import path from 'path';
const app = express();
const port = process.env.Port || 5000;

dotenv.config();
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`Started successfully at port http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(err)
});
app.use(helmet());
app.use(morgan("common"));
app.use(cookieparser());
app.use(fileupload({
    useTempFiles: true
}));
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://market-gcww.onrender.com/',
        ],
        credentials: true,
    })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth', router);
app.use(errorMiddleware);
