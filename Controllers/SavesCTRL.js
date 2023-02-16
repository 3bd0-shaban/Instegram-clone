import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
import Features from "../Utils/Features.js";

export const save = asyncHandler(async (req, res, next) => {

    const user = await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $push: { saves: req.params.id }
    }, { new: true })
    return res.json(user)
});

export const unsave = asyncHandler(async (req, res, next) => {
    const user = await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $pull: { saves: req.params.id }
    }, { new: true })
    return res.json(user)
});

export const GetSaves = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.findOne({ _id: req.user.id }),
        req.query).Pagination(resultperpage)

    const saves = await features.query
        .select('saves')
        .populate({
            path: 'saves',
            populate: {
                path: 'comments.user',
                select: 'username avatar'
            },
        })
        .populate({
            path: 'saves',
            populate: {
                path: 'user',
                select: 'username avatar'
            },
        })
        .sort("-createdAt");
    return res.json(saves)
});