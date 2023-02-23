import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "../Utils/cloudinary.js";
import Features from './../Utils/Features.js';

export const New_Post = asyncHandler(async (req, res, next) => {
    const { des, location, turnoffcomments, hiddenlikes, imageDes } = req.body
    let received = [...req.body.images];
    if (typeof req.body.images === "string") {
        received.push(req.body.images);
    } else {
        received = req.body.images;
    }
    const imagesLink = [];
    if (!received) {
        return next(new ErrorHandler('Fill all fields', 400));
    }
    for (let i = 0; i < received.length; i++) {
        const result = await cloudinary.uploader.upload(received[i], {
            folder: "Instegram/posts",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
            imageDes: imageDes
        });
    };
    const newPost = await new Posts({
        user: req.user.id, images: imagesLink, location, des, turnoffcomments, hiddenlikes
    })
    newPost.populate('user', 'username avatar')
    newPost.populate('comments.user', 'username avatar');
    newPost.save()
        .then(post => {
            return res.json({
                msg: 'post added successfully', post
            });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});

export const DeletePost = asyncHandler(async (req, res, next) => {
    const isDeleted = await Posts.deleteOne({ _id: req.params.id })
    for (let i = 0; i < isDeleted.images; i++) {
        const j = await cloudinary.uploader.destroy(images[i].public_id);
    }
    if (isDeleted) {
        return res.json({ msg: 'Deleted !' });
    }
    return next(new ErrorHandler('An Error accoured'), 400)

});
export const User_Posts = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const features = new Features(Posts.find({ user: req.user.id }), req.query).Pagination(resultperpage)
    const userPosts = await features.query
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar')
        .sort("-createdAt");
    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});

export const User_Posts_ById = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const features = new Features(Posts.find({ user: req.params.id }), req.query).Pagination(resultperpage)
    const userPosts = await features.query
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar')
        .sort("-createdAt");
    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});

export const Hide_Likes = asyncHandler(async (req, res, next) => {
    const post = await Posts.findByIdAndUpdate({ _id: req.params.id },
        [
            {
                $set: { hiddenlikes: { $eq: [false, '$hiddenlikes'] } }
            }
        ], { new: true })
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar');

    if (post) {
        return res.json(post);
    }
    return next(new ErrorHandler('An Error accoured'), 400)
});

export const TurnoffComments = asyncHandler(async (req, res, next) => {
    const post = await Posts.findByIdAndUpdate({ _id: req.params.id },
        [
            {
                $set: { turnoffcomments: { $eq: [false, '$turnoffcomments'] } }
            }
        ], { new: true })
        .populate('user', 'username avatar')
        .populate('comments.user', 'username avatar');

    if (post) {
        return res.json({ msg: 'updated !' });
    }
    return next(new ErrorHandler('An Error accoured'), 400)
});

export const FollowersPosts = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const newarr = [...req.user.following, req.user.id]
    const features = new Features(Posts.find({ user: newarr }), req.query).Pagination(resultperpage)
    const followersposts = await features.query
        .populate('user', 'username avatar')
        .select('-comments')
        .sort("-createdAt");
    if (!followersposts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(followersposts);
});

export const Get_PostDetails = asyncHandler(async (req, res, next) => {
    const PostDetails = await Posts.findById(req.params.id)
        .populate('comments.user', 'username avatar')
        .populate('user', 'username avatar');
    if (!PostDetails) {
        return next(new ErrorHandler('Post not founded'), 400)
    }
    return res.json(PostDetails);
});