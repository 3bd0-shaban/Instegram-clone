import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import Message from '../Models/Message.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
export const new_MSG = asyncHandler(async (req, res) => {
    const { msg } = req.body;
    await new Message({
        chatId: req.user.params, sender: req.user.id, msg
    }).save()
        .then((chat) => {
            return res.json(chat);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});

export const get_MSGs = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params;
    const MSGs = Message.find({ chatId });
    return res.json(MSGs)
});