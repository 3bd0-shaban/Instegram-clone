import express from 'express';
import {
    New_Chat,
    Get_ALL,
    Get_Single_Chat
} from '../Controllers/ChatCTRL.js';
import { auth } from '../Middlewares/Auth.js';
const router = express.Router();

router.get('/all', auth, Get_ALL);
router.get('/:id', auth, Get_Single_Chat);
router.post('/:id', auth, New_Chat);

export default router;
