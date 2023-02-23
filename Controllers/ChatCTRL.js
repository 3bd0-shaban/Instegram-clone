import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Message from './../Models/Message.js';
import Features from './../Utils/Features.js';

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
            return res.json(chat._id);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});
export const Get_ALL = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Chat.find(
        {
            members: { $in: [req.user.id] },
            lastMSG: { $ne: null }
        }), req.query)
        .Pagination(resultperpage)

    const Chats = await features.query
        .populate('members', 'username avatar fullname')
        .sort('-createdAt')
    return res.json(Chats)
});

export const Get_Single_Chat = asyncHandler(async (req, res, next) => {
    const SingleChat = await Chat.findById(req.params.id)
    return res.json(SingleChat)
});
