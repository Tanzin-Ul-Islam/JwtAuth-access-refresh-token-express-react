import express from "express";
import AuthService from "./auth.service.js";
const router = express.Router();

router.post('/sign-up', AuthService.signUp);
router.post('/sign-in', AuthService.signIn);
router.get('/regenerate-access-token', AuthService.regenerateAccessToken);
router.delete('/sign-out', AuthService.signOut)

export default router;