import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
import Features from "../Utils/Features.js";

export const Follow_Public_User = asyncHandler(async (req, res, next) => {
    const isfollowing = await Users.findOne({
        _id: req.params.id,
        $and: [
            { following: { $elemMatch: { $eq: req.user.id } } },
        ],
    });
    if (isfollowing) {
        return next(new ErrorHandler('Already following this user', 400));
    }
    await Users.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.user.id }
    }, { new: true });
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $push: { following: req.params.id }
    }, { new: true });
    return res.json({ msg: 'Followd !' })
});

export const UnFollow = asyncHandler(async (req, res, next) => {
    const isfollowing = await Users.findOne({
        _id: req.params.id,
        $in: [
            { followers: { $elemMatch: { $eq: req.user.id } } },
        ],
    });
    if (!isfollowing) {
        return next(new ErrorHandler('You are not following this user', 400));
    }
    await Users.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.user.id }
    }, { new: true });
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $pull: { following: req.params.id }
    }, { new: true });
    return res.json({ msg: 'UnFollowed !' })
});

export const FollowingList = asyncHandler(async (req, res, next) => {
    const followingUsers = await Users.findOne({ _id: req.params.id })
        .select('following')
        .populate('following', 'username avatar');
    return res.json(followingUsers);
});

export const FollowersList = asyncHandler(async (req, res, next) => {
    const followersUsers = await Users.findOne({ _id: req.params.id })
        .select('followers')
        .populate('followers', 'username avatar');
    return res.json(followersUsers);
});

export const UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({ _id: req.user.id }).populate('saves.$');
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    return res.json(user);
});
export const Get_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({ username: req.params.username }).populate('saves.$');
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    return res.json(user);
});
export const Update_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json(user);
    }
});
export const Update_UserRole = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body.isAdmin, {   //{$set :{isAdmin:true}}
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json({ msg: 'User Updated Successfully', user });
    }
});
export const Delete_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        await Users.deleteOne({ _id: req.params.id });
        return res.json({ msg: 'User deleted successfully' });
    }
});

export const AllUsers = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.find(), req.query).Pagination(resultperpage)
    const users = await features.query;
    return res.json(users);
});
export const Suggestion = asyncHandler(async (req, res, next) => {
    const users = await Users.find().limit(5)
    return res.json(users);
});


export const Search = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.find(), req.query).Pagination(resultperpage).Search()
    const userPosts = await features.query
    // .querysort("-createdAt");

    if (!userPosts) {
        return next(new ErrorHandler('No results founded'), 400)
    }
    return res.json(userPosts)
})