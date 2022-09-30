import express from "express";
import mongoose from "mongoose";
import {SignUp,SignIn,GetAccessToken,ForgotPassword,ResetPassword} from '../Controllers/UserController.js'
const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.post('/refresh_token',GetAccessToken);
router.post('/forgot',ForgotPassword);
router.post('/resetpassword:',ResetPassword);
export default router