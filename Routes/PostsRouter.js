import express from 'express';
import { New_Post } from '../Controllers/PostsCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', New_Post);
export default router
