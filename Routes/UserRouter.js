import express from 'express';
import {
    Search, UserInfo, AllUsers, Suggestion, Follow_Public_User, UnFollow, FollowingList, FollowersList, Follow_Private_User, ChangePrivacy,
    Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole, updateProfilePic, Block, UnBlock, Cancel_Follow_Request
} from '../Controllers/UserCTRL.js'
import { auth, authorizeRoles, checkBlock, ChechPrivacy } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/search', auth, Search);
router.put('/follow/:id', auth, Follow_Public_User);
router.put('/followPrivate/:id', auth, Follow_Private_User);
router.put('/cancelrequest/:id', auth, Cancel_Follow_Request);
router.put('/unfollow/:id', auth, UnFollow);
router.put('/block/:id', auth, Block, UnFollow);
router.put('/unblock/:id', auth, UnBlock);
router.put('/privacy', auth, ChangePrivacy);
router.get('/fowllowerslist/:id', auth, FollowersList);
router.get('/followinglist/:id', auth, FollowingList);
router.get('/suggestion', auth, Suggestion);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.get('/info', auth, UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.get('/get/:username', auth, checkBlock, Get_UserInfo);
router.get('/refresh', UserInfo);
router.put('/updateuser', auth, Update_UserInfo);
router.put('/updatepic', auth, updateProfilePic);
router.get('/getall', auth, authorizeRoles("admin"), AllUsers);
export default router