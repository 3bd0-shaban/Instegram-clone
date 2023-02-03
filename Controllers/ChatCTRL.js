import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import Message from '../Models/Message.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
export const New_Chat = asyncHandler(async (req, res, next) => {
    const isAlreadyinChat = await Chat.find({ members: [req.user.id, req.params.id] });
    if (isAlreadyinChat) {
        return next(new ErrorHandler('Chat Exist !', 200));;
    }
    await new Chat({
        members: [req.user._id, req.params.id]
    }).save()
        .then((chat) => {
            return res.json(chat);
        })
        .catch((err) => {
            console.log(err)
            return next(new ErrorHandler(err.message, 404));
        })
});
export const Get_User_Chats = asyncHandler(async (req, res, next) => {
    const Chats = await Chat.find({ members: { $in: [req.user._id] } }).populate('members', 'username avatar fullname    ')
    res.json(Chats)
});
export const Get_Single_Chat = asyncHandler(async (req, res, next) => {
    const chat = await Chat.findOne({ members: { $in: [req.user._id, req.params.id] } }).populate('members');
    res.json(chat)
});
export const Get_Chat_Messages = asyncHandler(async (req, res, next) => {
    const Chats = await Chat.findOne({ members: { $all: [req.user._id, req.params.id] } });
    res.json(Chats)
});
