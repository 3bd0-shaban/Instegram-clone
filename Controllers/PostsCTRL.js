import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const New_Post = asyncHandler(async (req, res, next) => {
    const { des, hiddenlikes, turnoffcomments, location, user } = req.body
    let images = [...req.body.images];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imagesLink = [];
    if (!images) {
        return next(new ErrorHandler('Theses field with * are requiured to process your action', 400));
    }
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "Instegram_Clone/posts",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    };

    await new Posts({
        user: req.user.id, imagesLink, des, hiddenlikes, turnoffcomments, location
    })
        .then(saved => {
            return res.json({
                msg: 'post added successfully', saved
            });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});
export const User_Posts = asyncHandler(async (req, res, next) => {
    const userPosts = Posts.find({ user: req.user.id });
    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json(userPosts);
});