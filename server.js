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
import AllowedOrigins from "./Origins.js";
import SocketServer from "./SocketServer.js";
import { createServer } from 'http';
import { Server } from "socket.io";
const app = express();
const http = createServer(app);
const port = process.env.Port || 5000;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
}).then(() => {
    http.listen(port, () => {
        console.log(`Started successfully at port http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(err)
});
app.use(helmet());
app.use(morgan("common"));
app.use(cookieparser());
const io = new Server(http, {
    cors: {
        origin: AllowedOrigins,
        credentials: true
    }
});
app.use(
    cors({
        origin: AllowedOrigins,
        credentials: true,
    })
);

io.on('connection', (socket) => {
    SocketServer(socket);
});
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
