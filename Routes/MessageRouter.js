import express from 'express';
import { } from '../Controllers/MessageCTRL.js';
import { auth } from '../Middlewares/Auth.js';
import { new_MSG, get_MSGs } from '../Controllers/MessageCTRL.js'
const router = express.Router();

router.post('/:id', auth, new_MSG)
router.get('/:id', auth, get_MSGs)
export default router