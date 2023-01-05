import express from "express";
import {
    SignUp, SignIn, ForgotPassword, ResetPassword, UserInfo, AllUsers, RefreshToken,
    LogOut, Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole
} from '../Controllers/AuthCTRL.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/info', auth, UserInfo);
router.get('/get/:username', auth, Get_UserInfo);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.get('/refresh', RefreshToken, UserInfo);
router.post("/logout", auth, LogOut);
router.post('/forgot', ForgotPassword);
router.post('/resetpassword:', ResetPassword);
router.get('/getall', auth, authorizeRoles("admin"), AllUsers);


export default router