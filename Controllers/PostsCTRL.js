import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "../Utils/cloudinary.js";
import Features from './../Utils/Features.js';

export const New_Post = asyncHandler(async (req, res, next) => {
    const { des, location, turnoffcomments, hiddenlikes, imageDes } = req.body
    let received = [...req.body.images];
    let videos = [req.body.video] && [...req.body.videos];
    let imagesLink = []
    let VideosLink = []
    let isReel = false
    req.setTimeout(500000);
    if (videos?.length > 0 ) {
        for (let i = 0; i < videos.length; i++) {
            isReel = true
            const result = await cloudinary.uploader.upload(videos[i], {
                folder: "Instegram/posts",
                transformation: [
                    { width: 1000, quality: 'auto' }
                ],
                resource_type: 'auto'
            });
            VideosLink.push({
                public_id: result.public_id,
                url: result.secure_url,
                imageDes: imageDes
            });
        };
    }
    for (let i = 0; i < received.length; i++) {
        const result = await cloudinary.uploader.upload(received[i], {
            folder: "Instegram/posts",
            transformation: [
                { width: 1000, quality: 'auto' }
            ],
            resource_type: 'auto'
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
            imageDes: imageDes
        });
    };
    const newPost = await new Posts({
        user: req.user.id, images: imagesLink, location, des, turnoffcomments, hiddenlikes, isReel,
        videos: VideosLink
    })
    newPost.populate('user', 'username avatar isVerified')
    // newPost.populate('comments.user', 'username avatar');
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
        await cloudinary.uploader.destroy(images[i].public_id);
    }
    if (isDeleted) {
        return res.json({ msg: 'Deleted !' });
    }
    return next(new ErrorHandler('An Error accoured'), 400)

});
export const User_Posts = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const features = new Features(Posts.find({ user: req.user.id, isReel: false }), req.query).Pagination(resultperpage)
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
    const features = new Features(Posts.find({ user: req.params.id, isReel: false }), req.query).Pagination(resultperpage)
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
        return res.json(post);
    }
    return next(new ErrorHandler('An Error accoured'), 400)
});

export const FollowersPosts = asyncHandler(async (req, res, next) => {
    const resultperpage = 4;
    const newarr = [...req.user.following, req.user.id]
    const features = new Features(Posts.find({ user: newarr }), req.query).Pagination(resultperpage)
    const followersposts = await features.query
        .populate('user', 'username avatar isVerified')
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

