import express from 'express';
import Users from '../models/Users.js';
// import sendEmail from '../utile/sendEmail.js';
const routeuser = express.Router();
import crypto from 'crypto';

export const SignUp = async (req, res, next) => {
    const { username, email, password, fullname } = req.body;
    if (!email || !username || !fullname || password){
        res.status(400).json({msg:'Please fill all fields'})
    }
}
