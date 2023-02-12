import express from "express";
import {
    SignUp, SignIn, ResetPassword, SetBirthday, RefreshToken,
    LogOut, activateEmail, Request2OTPActivate
} from '../Controllers/AuthCTRL.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();


router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/refresh', RefreshToken);
router.post('/birthday', SetBirthday);
router.post("/logout", auth, LogOut);
router.put("/activateEmail", activateEmail);
router.put("/request2otpactivate", Request2OTPActivate);
router.post('/resetpassword:', ResetPassword);



export default router