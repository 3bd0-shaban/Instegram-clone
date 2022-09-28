import Users from '../Models/Users.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import sendEmail from './sendEmail.js';
const { Client_URL } = process.env
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
            // const url = `${Client_URL}`/user/`${token}`;
            // sendEmail(email, url);
            new Users({
                email, username, password: HashedPassword, fullname
            }).save()
                .then(newuser => {
                    return res.status(200).json({ msg: 'Account Created successfully , Please activate your acount', newuser, token });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        } else {
            const user = await Users.findOne({ email});
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Email' });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (!isMatch) {
                    return res.status(400).json({ msg: 'Invalid Password' });
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message });
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



