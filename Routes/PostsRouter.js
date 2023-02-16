import express from 'express';
import { New_Post, User_Posts, FollowersPosts, User_Posts_ById, Get_PostDetails, DeletePost, Hide_Likes, TurnoffComments } from '../Controllers/PostsCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', auth, New_Post);
router.get('/getuser', auth, User_Posts);
router.get('/get/all/:id', auth, User_Posts_ById);
router.get('/get/:id', auth, Get_PostDetails);
router.delete('/delete/:id', auth, DeletePost);
router.put('/hidelikes/:id', auth, Hide_Likes);
router.put('/turncomments/:id', auth, TurnoffComments);
router.get('/get/followers/posts', auth, FollowersPosts);
export default router
