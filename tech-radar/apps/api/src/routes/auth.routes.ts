import express from "express";
import { getTokenInfo, login, logout } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/tokenInfo", authenticateJWT, getTokenInfo);


export default router;
