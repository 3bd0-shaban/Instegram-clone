import Posts from "../Models/Posts.js";
import { asyncHandler } from "../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Users from "../Models/Users.js";
import Features from "../Utils/Features.js";
import cloudinary from './../Utils/cloudinary.js';
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
    return res.json(isfollowing)
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
    return res.json(isfollowing)
});

export const Block = asyncHandler(async (req, res, next) => {
    const isBlocked = await Users.findOne({
        _id: req.user.id,
        $and: [
            { blocklist: { $elemMatch: { $eq: req.params.id } } },
        ],
    });
    if (isBlocked) {
        return next(new ErrorHandler('Already Blocked this user', 400));
    }
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $push: { blocklist: req.params.id }
    }, { new: true });
    return res.json(isBlocked)
});

export const UnBlock = asyncHandler(async (req, res, next) => {
    const isBlocked = await Users.findOne({
        _id: req.user.id,
        $and: [
            { blocklist: { $elemMatch: { $eq: req.params.id } } },
        ],
    });
    if (!isBlocked) {
        return next(new ErrorHandler('This user not blocked', 400));
    }
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $pull: { blocklist: req.params.id }
    }, { new: true });
    return res.json(isBlocked)
});

export const FollowingList = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.findOne({ _id: req.params.id }), req.query).Pagination(resultperpage)
    const followingUsers = await features.query
        .select('following')
        .populate('following', 'username avatar')
        .sort("-createdAt");
    return res.json(followingUsers);
});

export const FollowersList = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.findOne({ _id: req.params.id }), req.query).Pagination(resultperpage)
    const followersUsers = await features.query
        .select('followers')
        .populate('followers', 'username avatar')
        .sort("-createdAt");
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
    const { fullname, username, website, bio, email, phoneNumber, gender } = req.body;
    if (username == '' || fullname == '' || email == '') {
        return next(new ErrorHandler('Fields can not be empty', 400));
    }
    const checkusername = await Users.findOne({ username });
    if (checkusername) {
        return next(new ErrorHandler('username Already exist', 400));
    };
    const checkemail = await Users.findOne({ email });
    if (checkemail) {
        return next(new ErrorHandler('username Already exist', 400));
    };
    const user = await Users.findByIdAndUpdate({ _id: req.user.id },
        req.body, { new: true });
    return res.json(user);
});

export const updateProfilePic = asyncHandler(async (req, res, next) => {
    const file = req.body.avatar;
    const result = await cloudinary.uploader.upload(file, {
        folder: "Instegram/User",
    });
    const user = await Users.findByIdAndUpdate({ _id: req.user.id },
        {
            avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        }, { new: true });
    return res.json({ user });

})

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
    const newarr = [...req.user.following, req.user.id]
    const num = req.query.num || 10;
    const users = await Users.aggregate([

        { $match: { _id: { $nin: newarr } } },
        { $sample: { size: Number(num) } },
        {
            $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "followers",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "following",
            },
        },
    ]).limit(5)
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