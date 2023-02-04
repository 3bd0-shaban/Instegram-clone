import express from 'express';
import {
    New_Chat,
    Get_User_Chats,
    Get_Chat_Messages,
    Get_Single_Chat,
} from '../Controllers/ChatCTRL.js';
import { auth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/:id', auth, New_Chat);
router.get('/all', auth, Get_User_Chats);
router.get('/get/messeages', auth, Get_Chat_Messages);
router.get('/get/single/:id', auth, Get_Single_Chat);

export default router;
