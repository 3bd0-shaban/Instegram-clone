import express from "express";
import {
    SignUp, SignIn, ResetPassword, SetBirthday, RefreshToken,
    LogOut, activateEmail, Request2OTPActivate, ChangePassword
} from '../Controllers/AuthCTRL.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();


router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/refresh', RefreshToken);
router.post('/birthday', auth, SetBirthday);
router.post("/logout", auth, LogOut);
router.put("/activateEmail", activateEmail);
router.put("/changepassword", auth, ChangePassword);
router.put("/request2otpactivate", Request2OTPActivate);
router.post('/resetpassword:', ResetPassword);



export default router