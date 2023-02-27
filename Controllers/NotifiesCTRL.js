import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
import Features from "../Utils/Features.js";
import cloudinary from './../Utils/cloudinary.js';
import Notifies from "../Models/Notifies.js";

export const NewNotify = asyncHandler(async (req, res, next) => {
    const { type, comment, like, isRead, post } = req.body;
    await new Notifies({
        type: 'follow', comment, like, sender: req.user.id, receiver: req.params.id, isRead, post
    }).save()
        .then((notify) => {
            return res.json(notify)
        }).catch(err => {
            console.log(err)
        })
});
export const GetNotifies = asyncHandler(async (req, res, next) => {
    let resultperpage = 10;
    const features = new Features(Notifies.find({ receiver: req.user.id }), req.query).Pagination(resultperpage)
    const notifies = await features.query.populate('sender')
    if (!notifies) {
        return next(new ErrorHandler('No Notifes Founded', 404));
    }
    return res.json(notifies);
});