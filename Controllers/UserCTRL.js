import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
import Features from "../Utils/Features.js";

export const Follow_Public_User = asyncHandler(async (req, res, next) => {
    await Users.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.user.id }
    }, { new: true });
    await Users.findByIdAndUpdate({ user: req.user.id }, {
        $push: { following: req.params.id }
    }, { new: true });
    return res.json({ msg: 'you are now follwing this user' })
});


export const UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({ _id: req.user.id }).populate('saves.$');
    console.log(user)
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


export const Search = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.find(), req.query).Pagination(resultperpage).Search()
    const userPosts = await features
    // .querysort("-createdAt");

    if (!userPosts) {
        return next(new ErrorHandler('No Posts For that user'), 400)
    }
    return res.json({ msg: 'you are now follwing this user' })
})