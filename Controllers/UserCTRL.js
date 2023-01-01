import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
export const Follow_Public_User = asyncHandler(async (req, res, next) => {
    await Users.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.user.id }
    }, { new: true });
    await Users.findByIdAndUpdate({ user: req.user.id }, {
        $push: { following: req.params.id }
    }, { new: true });
    return res.json({ msg: 'you are now follwing this user' })
})