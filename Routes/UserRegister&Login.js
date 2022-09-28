import express from "express";
import mongoose from "mongoose";
import {SignUp,SignIn} from '../Controllers/UserController.js'
const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn)
export default router