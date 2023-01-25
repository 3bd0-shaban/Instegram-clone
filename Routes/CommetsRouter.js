import express from 'express';
import { Send_New_Comment, Like, UnLike, CommentsLikesCounter, checkLike } from '../Controllers/CommentsCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new/:id', auth, Send_New_Comment);
router.put('/like/:id', auth, Like);
router.get('/isLiked', auth, checkLike);
router.put('/unlike/:id', auth, UnLike);
router.get('/length/:id', auth, CommentsLikesCounter);

export default router
