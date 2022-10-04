import express from "express";
import { SignUp, SignIn, GetAccessToken, ForgotPassword, ResetPassword, UserInfo,AllUsers, LogOut } from '../Controllers/UserController.js'
import { auth,isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/logout', LogOut);
router.post('/refresh_token', GetAccessToken);
router.post('/forgot', ForgotPassword);
router.post('/resetpassword:', ResetPassword);
router.get('/info',auth, UserInfo);
router.get('/users',isAdmin, AllUsers);
export default router