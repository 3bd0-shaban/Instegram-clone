import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "../Utils/cloudinary.js";
import Features from './../Utils/Features.js';

export const New_Post = asyncHandler(async (req, res, next) => {
    const { user, des, location, images } = req.body
    let received = [...req.body.images];
    if (typeof req.body.images === "string") {
        received.push(req.body.images);
    } else {
        received = req.body.images;
    }
    const imagesLink = [];
    if (!received) {
        return next(new ErrorHandler('Theses field with * are requiured to process your action', 400));
    }
    for (let i = 0; i < received.length; i++) {
        const result = await cloudinary.uploader.upload(received[i], {
            folder: "Instegram_Clone/posts",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    };
    await new Posts({
        user: req.user.id, images: imagesLink, location, des
    }).save()
        .then(saved => {
            return res.json({
                msg: 'post added successfully', saved
            });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});
export const User_Posts = asyncHandler(async (req, res, next) => {
    const userPosts = await Posts.find({ user: req.user.id });
    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});
export const User_Posts_ById = asyncHandler(async (req, res, next) => {
    const userPosts = await Posts.find({ user: req.params.id });
    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});
export const Get_PostDetails = asyncHandler(async (req, res, next) => {
    const userPosts = await Posts.findById(req.params.id)
        .populate('comments.user', 'username avatar')
        .populate('user', 'username avatar');
    if (!userPosts) {
        return next(new ErrorHandler('Post not founded'), 400)
    }
    return res.json(userPosts);
});
export const FollowersPosts = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const newarr = [...req.user.followers, req.user.id]
    const features = new Features(Posts.find({ user: newarr }), req.query).Pagination(resultperpage)
    const userPosts = await features.query
        .populate('user', 'username avatar')
    // .querysort("-createdAt");

    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});
