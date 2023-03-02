import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Features from './../Utils/Features.js';


export const FollowersReel = asyncHandler(async (req, res, next) => {
    // const resultperpage = 2;
    // const newarr = [...req.user.following, req.user.id]
    // const features = new Features(Posts.find({ user: newarr, isReel: true }), req.query).Pagination(resultperpage)
    // const FollowersReel = await features.query
    //     .populate('user', 'username avatar')
    //     .select('-comments')
    //     .sort("-createdAt");
    // if (!FollowersReel) {
    //     return next(new ErrorHandler('No Reels For that user'), 400)
    // }
    // return res.json(FollowersReel);
});

export const AllReelsPaginated = asyncHandler(async (req, res, next) => {
    const resultperpage = 2;
    const features = new Features(Posts.find({ isReel: true }), req.query).Pagination(resultperpage)
    const AllReels = await features.query
        .populate('user', 'username avatar followers')
        .select('-comments')
        .sort("-createdAt");
    if (!AllReels) {
        return next(new ErrorHandler('No Reels For that user'), 400)
    }
    return res.json(AllReels);
});



export const User_Reels_ById = asyncHandler(async (req, res, next) => {
    const resultperpage = 2;
    const features = new Features(Posts.find({ user: req.params.id, isReel: true }), req.query).Pagination(resultperpage)
    const userReels = await features.query
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar')
        .sort("-createdAt");
    const count = await Posts.countDocuments({ user: req.params.id, isReel: true });
    if (!userReels) {
        return next(new ErrorHandler('No Reels For that user'), 400)
    }
    return res.json({ userReels, count });
});


export const User_Reels = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const features = new Features(Posts.find({ user: req.user.id, isReel: true }), req.query).Pagination(resultperpage)
    const userReels = await features.query
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar')
        .sort("-createdAt");
    if (!userReels) {
        return next(new ErrorHandler('No Reels For that user'), 400)
    }
    return res.json(userReels);
});

export const Get_Users_With_Active_Reels = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const newarr = [...req.user.following, req.user.id]
    const features = new Features(Posts.find({ $and: [{ isReel: true, user: newarr }] }),
        req.query).Pagination(resultperpage)
    const ArrayofDublicates = await features.query
        .populate('user', 'username avatar')
        .select('user')
        .sort("-createdAt");

    const ActiveReels = ArrayofDublicates.filter((user, index, self) =>
        index === self.findIndex((u) =>
            u.user._id === user.user._id && u.user.username === user.user.username
        )
    );

    if (!ActiveReels) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(ActiveReels);
});

