import express from "express";
import config from './config.js';
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieparser from 'cookie-parser';
import errorMiddleware from './Middlewares/Error.js';
import AuthRouter from './Routes/AuthRoute.js';
import UserRouter from './Routes/UserRouter.js';
import CommetsRouter from './Routes/CommetsRouter.js';
import SavesRouter from './Routes/SavesRouter.js';
import PostsRouter from './Routes/PostsRouter.js';
import MessageRouter from './Routes/MessageRouter.js';
import ChatRouter from './Routes/ChatRouter.js';
const app = express();
const port = process.env.Port || 5000;
mongoose.connect(process.env.MONGODB_URI, {
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
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://instegram-backend.onrender.com/',
        ],
        credentials: true,
    })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/post', PostsRouter);
app.use('/api/auth', SavesRouter);
app.use('/api/message', MessageRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/comment', CommetsRouter);
app.use(errorMiddleware);
