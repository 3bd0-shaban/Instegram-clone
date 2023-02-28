import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import send_Email from '../Utils/sendEmail.js'
import { Auth } from 'googleapis';
export const SignUp = asyncHandler(async (req, res, next) => {
    const { email, password, confirmpassword, fullname, username } = req.body;
    if (!email || !password || !confirmpassword || !fullname || !username) {
        return next(new ErrorHandler('Please Fill All Fields', 400));
    }
    if (password.lenght <= 6) {
        return next(new ErrorHandler('Passowrd must be more than 6 characters', 400));
    }
    if (password !== confirmpassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler('Invalid Email', 400));
    }
    const user = await Users.findOne({ email });
    const isusername = await Users.findOne({ username });
    if (isusername) {
        return next(new ErrorHandler('Username Already Registered', 400));
    }
    if (user) {
        return next(new ErrorHandler('Email Already Registered', 400));
    } else {
        const slat = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, slat);
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        new Users({
            email, password: HashedPassword, fullname, username, otp: req.app.locals.OTP
        }).save()
            .then(newuser => {

                send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
                return res.json({ msg: 'Account Created successfully , Please activate your acount' });
            })
            .catch(err => {
                return res.status(400).json({ msg: err.message });
            })
    }
})

export const SignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('Please Fill All Fields', 400));
    }
    if (!validateEmail(email)) {
        return next(new ErrorHandler('Invalid Email', 400));
    } else {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ msg: 'wrong Email' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return next(new ErrorHandler('Invalid Email Or Password', 400));;
            }
        }
        const accessToken = createAccessToken({ id: user.id, roles: user.roles });
        const refresh_Token = createRefreshToken({ id: user._id, roles: user.roles });
        res.cookie('Jwt', refresh_Token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === "production" ? true : false,
            expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
            sameSite: 'none'
        });
        return res.json({ msg: 'successfully Logged In', accessToken, user });
    }
});


export const SetBirthday = asyncHandler(async (req, res, next) => {
    const { year, month, day } = req.body;
    const user = await Users.findOne({ email: req.user.email })
    if (user) {
        await Users.updateOne({ email: user.email },
            { birthday: req.body }, { new: true });
        return res.json({ msg: "Birthday Done!" })
    }
    return next(new ErrorHandler('Email not founded !', 400));

});

export const activateEmail = asyncHandler(async (req, res, next) => {
    const { email, code } = req.query;
    const user = await Users.findOne({ email })
    if (user) {
        if (user.otp == parseInt(code)) {
            req.app.locals.OTP = null;
            await Users.updateOne({ email: user.email },
                { isVerified: true }, { new: true });
            const accessToken = createAccessToken({ id: user.id, roles: user.roles });
            const refresh_Token = createRefreshToken({ id: user._id, roles: user.roles });
            res.cookie('Jwt', refresh_Token, {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === "production" ? true : false,
                expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24), // 7d
                sameSite: 'none'
            });
            return res.json({ msg: "Your email verified successfully", accessToken })
        }
        return next(new ErrorHandler('Invalid OTP !', 400));

    }
    return next(new ErrorHandler('Email not founded !', 400));

});

export const Request2OTPActivate = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    send_Email(email, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    await Users.updateOne({ email }, { otp: req.app.locals.OTP }, { new: true });
    return res.json({ msg: "Access Granted !" })
});

export const RefreshToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.Jwt
    if (!refreshToken) {
        return next(new ErrorHandler('Sign In First', 400));
    }
    const auth = Jwt.verify(refreshToken, process.env.JWT_REFRESH)
    if (!auth) {
        return next(new ErrorHandler('Authorization Failed, Please Log In Again', 400));
    }
    const accessToken = createAccessToken({ id: auth.id, roles: auth.roles });
    const user = await Users.findOne({ _id: auth.id })
    return res.json({ accessToken, user })
});

export const ForgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.query
    if (!email) {
        return next(new ErrorHandler('Email is required', 400));
    }
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const user = await Users.findOneAndUpdate({ email }, { otp: req.app.locals.OTP }, { new: true });
    const to = user.email
    send_Email(to, 'Here is the OTP to recover your account, please do not share it with anyone', req.app.locals.OTP)
    return res.send({ code: req.app.locals.OTP });
});


export const VerifyOtp = asyncHandler(async (req, res, next) => {
    const { code, email } = req.query;
    const user = await Users.findOne({ email })
    if (parseInt(req.app.locals.OTP) === parseInt(code) && user.otp == parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetsession = true
        return res.json({ msg: 'Verified Successflly' })
    }
    return next(new ErrorHandler('Invalid OTP !', 400));
});

export const CreateResetSession = asyncHandler(async (req, res, next) => {
    // const { code } = req.query;
    if (req.app.locals.resetsession) {
        req.app.locals.resetsession = true
        return res.json({ msg: "Access Granted !" })
    }
    return next(new ErrorHandler('OTP Expired !', 400));
});

export const ChangePassword = asyncHandler(async (req, res, next) => {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const { email } = req.user;
    if (!newpassword || !confirmpassword || !oldpassword) {
        return next(new ErrorHandler('Please enter all fields', 400));
    }
    const user = await Users.findOne({ email }).select('+password');
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
        return next(new ErrorHandler('Invalid Email Or Password', 400));
    }
    if (newpassword !== confirmpassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }
    if (newpassword.length <= 6) {
        return next(new ErrorHandler('Passowrd must be more than 6 characters', 400));
    }
    const slat = await bcrypt.genSalt();
    const HashedPassword = await bcrypt.hash(newpassword, slat);
    await Users.findOneAndUpdate({ email: req.user.email }, {
        password: HashedPassword
    }, { new: true })
    return res.json({ msg: 'Password updated' })
});

export const ResetPassword = asyncHandler(async (req, res, next) => {

    const { password, confirmpassword, email } = req.body;
    if (!req.app.locals.resetsession) {
        return next(new ErrorHandler('Session Expired !', 401));
    }
    if (!password || !confirmpassword) {
        return next(new ErrorHandler('Fill all fields'), 400)
    }
    if (password !== confirmpassword) {
        return next(new ErrorHandler('Passwords do not match'), 400);
    }
    if (password.lenght <= 6) {
        return next(new ErrorHandler('Passowrd must be more than 6 characters', 400));
    }
    Users.findOne({ email })
        .then(user => {
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    Users.updateOne({ email: user.email },
                        { password: hashedPassword }, function (err, data) {
                            if (err) throw err;
                            req.app.locals.resetsession = false; // reset session
                            return res.json({ msg: "Record Updated...!" })
                        });
                })
                .catch(e => {
                    return next(new ErrorHandler('Enable to hashed password', e.message, 400));
                })
        })
        .catch(error => {
            return next(new ErrorHandler('Email not founded', 400));
        })
});

export const LogOut = asyncHandler((req, res, next) => {
    res.clearCookie('Jwt', { path: '/' });
    return res.json({ msg: 'Loged Out' });
});
function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
const createAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '7d' })
}