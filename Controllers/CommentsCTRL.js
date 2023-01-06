
import Posts from "../Models/Posts.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';

export const Send_New_Comment = asyncHandler(async (req, res, next) => {
    await Posts.findById(req.params.id).populate('comments.user');
    await Posts.findByIdAndUpdate(req.params.id, {
        $push: {
            comments: { user: req.user.id, comment: req.body.comment }
        },
    }, { new: true });
    return res.json({ msg: "Your comment added successfully" });
});
export const Delete_User_Review = asyncHandler(async (req, res, next) => {

})

export const Like = asyncHandler(async (req, res, next) => {
    // const post = await Posts.findById(req.params.id).populate('likes.user');
    // const isLiked = post.likes.find(p => p.user.id )
    // if(isLiked === req.user.id){
    //     console.log(true)
    // }
    // console.log(false)
    await Posts.findByIdAndUpdate(req.params.id, {
        $push: {
            likes: { user: req.user.id }
        },
    }, { new: true });
    return res.json({ msg: "Liked !" });
});
export const UnLike = asyncHandler(async (req, res, next) => {
    await Posts.findByIdAndUpdate(req.params.id, {
        $pull: {
            likes: { user: req.user.id }
        },
    }, { new: true });
    return res.json({ msg: "Liked !" });
});