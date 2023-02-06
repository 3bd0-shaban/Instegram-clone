import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import Message from '../Models/Message.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
export const new_MSG = asyncHandler(async (req, res, next) => {
    const { msg } = req.body;
    const chat = await new Message({
        chatId: req.params.id, sender: req.user.id, msg
    }).save()
    
    if (chat) {
        await Chat.findByIdAndUpdate({ _id: req.params.id },
            { lastMSG: msg },
            { new: true })
        return res.json(chat);
    }
    return next(new ErrorHandler(err.message, 404));
});

export const get_MSGs = asyncHandler(async (req, res, next) => {
    const MSGs = await Message.find({ chatId: req.params.id });
    return res.json(MSGs)
});