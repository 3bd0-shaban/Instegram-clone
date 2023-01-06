import express from 'express';
import { Send_New_Comment, Like, UnLike } from '../Controllers/CommentsCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new/:id', auth, Send_New_Comment);
router.post('/like/:id', auth, Like);
router.post('/unlike/:id', auth, UnLike);

export default router
