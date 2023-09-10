import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./src/module/user/user.router.js";
import AuthRouter from "./src/module/auth/auth.router.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
    console.log('Server running on port:' + process.env.PORT);
})