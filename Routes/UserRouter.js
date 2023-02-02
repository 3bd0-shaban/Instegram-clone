import express from 'express';
import {
    Search, UserInfo, AllUsers,
    Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole
} from '../Controllers/UserCTRL.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/search', auth, Search);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.get('/info', auth, UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.get('/get/:username', auth, Get_UserInfo);
router.get('/refresh', UserInfo);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.get('/getall', auth, authorizeRoles("admin"), AllUsers);
export default router