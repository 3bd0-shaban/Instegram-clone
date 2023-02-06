import express from 'express';
import {
    New_Chat,
    Get_User_Chats,
    Get_Chat_Messages,
} from '../Controllers/ChatCTRL.js';
import { auth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/:id', auth, New_Chat);
router.get('/all', auth, Get_User_Chats);
router.get('/get/messeages', auth, Get_Chat_Messages);

export default router;
