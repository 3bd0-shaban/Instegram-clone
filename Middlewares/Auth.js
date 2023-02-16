import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import { asyncHandler } from "./asyncErrorHandler.js";
export const auth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return next(
        new ErrorHandler('You are not authorized, Please log in again', 403)
    );
    const token = authHeader.split(' ')[1]
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) return next(
        new ErrorHandler('You Are Not Authorized, Please log in again', 403)
    );
    req.user = await Users.findById(verify.id);
    next();
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.some(role => req.user.roles.includes(role))) {
            return next(
                new ErrorHandler(`Role: ${roles.includes(req.user)} is not allowed to access this resouce `, 403)
            );
        }
        next();
    };
};

export const checkBlock = asyncHandler(async (req, res, next) => {

    const userById = await Users.findOne({ username: req.params.username }).populate('blocklist')
    const LoggedAccount = await Users.findOne({ username: req.user.username }).populate('blocklist')
    const user = (LoggedAccount.blocklist.some(blockuser => blockuser.username === req.params.username)) ||
        (userById.blocklist.some(blockuser => blockuser.username === req.params.username));

    if (user) {
        return next(new ErrorHandler('You have no access to this account ', 404));
    }

    next();
});

// export const ChechPrivacy = asyncHandler(async (req, res, next) => {
//     const user = await Users.findOne({ username: req.params.username });
//     console.log(user)
//     if (user.isprivat) {
//         new ErrorHandler('This account is privat you can not see posts unless you follow it', 403);
//     }
//     next();
// })
