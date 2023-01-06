import express from 'express';
import { save, unsave, GetSaves } from '../Controllers/SavesCTRL.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.get('/saves', auth, GetSaves);
router.put('/save/:id', auth, save);
router.put('/unsave/:id', auth, unsave);

export default router
