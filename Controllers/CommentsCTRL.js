
import Posts from "../Models/Posts.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';

export const Send_New_Comment = asyncHandler(async (req, res, next) => {
    await Posts.findById(req.params.id).populate('comments.user');
    await Posts.findByIdAndUpdate(req.params.id, {
        $push: {
            comments: { user: req.user.id, comment: req.body.comment }
        },
        $inc: {
            numComments: 1
        }
    }, { new: true });
    return res.json({ msg: "Your comment added successfully" });
});
export const Delete_User_Review = asyncHandler(async (req, res, next) => {

})

export const Like = asyncHandler(async (req, res, next) => {
    await Posts.findByIdAndUpdate(req.params.id, {
        $push: {
            likes: req.user._id
        },
        $inc: {
            numLikes: 1
        }
    }, { new: true });
    return res.json({ msg: "Liked !" });
});
export const UnLike = asyncHandler(async (req, res, next) => {
    await Posts.findByIdAndUpdate(req.params.id, {
        $pull: {
            likes: req.user._id
        },
        $inc: {
            numLikes: -1
        }
    }, { new: true });
    return res.json({ msg: "UnLiked !" });
});
export const checkLike = asyncHandler(async (req, res, next) => {
    const { post_id } = req.body;
    const post = await Posts.findOne({ _id: post_id });
    if (post) {
        const isLiked = Posts.find({ likes: { $in: [req.user.id] } })
        console.log(isLiked)
        if (isLiked) {
            return res.json(true);
        }
        return res.json(false);
    }
});
export const CommentsLikesCounter = asyncHandler(async (req, res, next) => {
    const length = await Posts.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        {
            $project: {
                totalLikes: { $size: '$likes' },
                totalComments: { $size: '$comments' }
            }
        },
    ]);
    return res.json(length)
})