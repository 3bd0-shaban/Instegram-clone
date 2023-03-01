import express from 'express';
import {
    New_Post,
    User_Posts,
    FollowersPosts,
    User_Posts_ById,
    Get_PostDetails,
    DeletePost,
    Hide_Likes,
    TurnoffComments, Get_Users_With_Active_Reels,
} from '../Controllers/PostsCTRL.js';
import { FollowersReel, User_Reels, User_Reels_ById, AllReelsPaginated } from '../Controllers/ReelsCTRL.js'
import { auth, authorizeRoles, ChechPrivacy } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', auth, New_Post);
router.get('/getuser', auth, User_Posts);
router.get('/get/all/:id', auth, ChechPrivacy, User_Posts_ById);

router.get('/get/:id', auth, Get_PostDetails);
router.put('/hidelikes/:id', auth, Hide_Likes);
router.put('/turncomments/:id', auth, TurnoffComments);
router.get('/get/followers/posts', auth, FollowersPosts);
router.delete('/delete/:id', auth, DeletePost);


router.get('/getall/reels', auth, AllReelsPaginated);
router.get('/activeReels', auth, Get_Users_With_Active_Reels);
router.get('/get/followers/reels', auth, FollowersReel);
router.get('/userreels', auth, User_Reels);
router.get('/get/userbyidreels/:id', auth, ChechPrivacy, User_Reels_ById);
export default router
