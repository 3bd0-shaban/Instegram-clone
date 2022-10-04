import Users from '../Models/Users.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import send_Email from './sendEmail.js';
const { Client_URL } = process.env
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

export const SignUp = async (req, res, next) => {
    const { username, email, password, fullname } = req.body;
    try {
        if (!email || !username || !fullname || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        if (password.lenght <= 6) {
            return res.status(400).json({ msg: 'Password must be more than 6 characters' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email already registered' });
        } else {
            const slat = await bcrypt.genSalt();
            const HashedPassword = await bcrypt.hash(password, slat)
            const newuser = {
                email, password, username, fullname
            }
            const token = createActivationToken(newuser)


            const url = `${Client_URL}` / user / `${token}`;
            send_Email(email, url);
            return res.status(200).json({ msg: 'Account Created successfully , Please activate your acount', newuser, token });

            // new Users({
            //     email, username, password: HashedPassword, fullname
            // }).save()
            //     .then(newuser => {
            // return res.status(200).json({ msg: 'Account Created successfully , Please activate your acount', newuser, token });
            //     })
            //     .catch(err => {
            //         return res.status(400).json({ msg: err.message });
            //     })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid Email' });
        } else {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'wrong Email' });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({ msg: 'wrong Password' });
                }
            }
            const refresh_Token = createRefressToken({ id: user._id })
            res.cookie('authcookie', refresh_Token, {
                httpOnly: true,
                path: '/api/auth/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            return res.status(200).json({ msg: 'Successfully Logged in', refresh_Token });

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const GetAccessToken = (req, res) => {
    try {
        const rf_token = req.cookies.authcookie;
        if (!rf_token) {
            res.status(400).json({ msg: 'Log In First' })
        }
        Jwt.verify(rf_token, process.env.JWT_REFRESH, (err, user) => {
            if (err) {
                res.status(400).json({ msg: 'Log In First Man' });
            }
            const access_Token = createAccessToken({ id: user.id });
            res.json({ access_Token })
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Please Enter Valid Email' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
        const access_Token = createAccessToken({ id: user._id });
        const url = `${Client_URL}` / user / `${access_Token}`;
        send_Email(email, url, "reset Your Password");
        res.status(200).json({ msg: 'Email Send Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
export const ResetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const slat = await bcrypt.genSalt();
        const HashedPassword = await bcrypt.hash(password, slat);
        await Users.findByIdAndUpdate({ _id: req.user.id });
        password: HashedPassword;
        res.status(200).json({ msg: 'Password Cahnged Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const UserInfo = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const AllUsers = async (req, res) => {
    try {
        const user = await Users.find().select('-password');
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const LogOut = async (req, res) => {
    try {
        res.clearCookie('authcookie',{path: '/api/auth/refresh_token',})
        res.json({msg:'LogedOut'});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
const createActivationToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_SCCESS, { expiresIn: '15m' })
}
const createRefressToken = (payload) => {
    return Jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '7d' })
}



