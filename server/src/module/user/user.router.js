import express from "express";
import UserService from "./user.service.js";
import AuthMiddleware from "../../middleware/auth.middleware.js";
const router = express.Router();

router.get('/all', AuthMiddleware.authGuardMiddleware, UserService.getAll);

export default router;