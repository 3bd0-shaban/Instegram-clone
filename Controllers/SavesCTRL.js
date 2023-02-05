import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";

export const save = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({
        _id: req.user.id,
        saved: req.params.id,
    });
    if (user.length > 0) {
        return next(new ErrorHandler('You have already saved this post'), 400);
    }
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $push: { saves: req.params.id }
    }, { new: true }).populate('saves')
    return res.json({ msg: 'saved' })
});

export const unsave = asyncHandler(async (req, res, next) => {
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $pull: { saves: req.params.id }
    }, { new: true }).populate('saves')
    return res.json({ msg: 'unsaved' })
});

export const GetSaves = asyncHandler(async (req, res, next) => {
    const saves = await Users.findOne({ _id: req.user.id }).select('saves').populate('saves', 'images')
    return res.json(saves)
});