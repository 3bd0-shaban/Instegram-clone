import express from 'express';
import {
    Search, UserInfo, AllUsers, Suggestion, Follow_Public_User, UnFollow, FollowingList, FollowersList,
    Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole, updateProfilePic, Block, UnBlock
} from '../Controllers/UserCTRL.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/search', auth, Search);
router.put('/follow/:id', auth, Follow_Public_User);
router.put('/unfollow/:id', auth, UnFollow);
router.put('/block/:id', auth, Block);
router.put('/unblock/:id', auth, UnBlock);
router.get('/fowllowerslist/:id', auth, FollowersList);
router.get('/followinglist/:id', auth, FollowingList);
router.get('/suggestion', auth, Suggestion);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.get('/info', auth, UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.get('/get/:username', auth, Get_UserInfo);
router.get('/refresh', UserInfo);
router.put('/updateuser', auth, Update_UserInfo);
router.put('/updatepic', auth, updateProfilePic);
router.get('/getall', auth, authorizeRoles("admin"), AllUsers);
export default router