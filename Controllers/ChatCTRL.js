import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Message from './../Models/Message.js';
export const New_Chat = asyncHandler(async (req, res, next) => {
    const isAlreadyinChat = await Chat.findOne({
        $and: [
            { members: { $elemMatch: { $eq: req.user.id } } },
            { members: { $elemMatch: { $eq: req.params.id } } },
        ],
    }).populate("members")
    if (isAlreadyinChat) {
        // const ChatID = isAlreadyinChat.members.find(p => p.id !== req.user.id)
        return res.json(isAlreadyinChat._id)
    }
    await new Chat({
        members: [req.user._id, req.params.id]
    }).save()
        .then((chat) => {
            console.log(chat)
            return res.json(chat._id);
        })
        .catch((err) => {
            console.log(err)
            return next(new ErrorHandler(err.message, 404));
        })
});
export const Get_User_Chats = asyncHandler(async (req, res, next) => {
    const Chats = await Chat.find({
        members: { $in: [req.user.id] },
        lastMSG: { $ne: null}
    })
        .populate('members', 'username avatar fullname')
        .sort('-createdAt')
        .limit(10)
    return res.json(Chats)
});

export const Get_Chat_Messages = asyncHandler(async (req, res, next) => {
    const Chats = await Chat.findOne({ members: { $all: [req.user.id, req.params.id] } });
    res.json(Chats)
});
