import express from 'express';
import { NewNotify, GetNotifies } from '../Controllers/NotifiesCTRL.js';
import { auth } from '../Middlewares/Auth.js';
const router = express.Router();

router.post('/:id', auth, NewNotify);
router.get('/', auth, GetNotifies);

export default router;
