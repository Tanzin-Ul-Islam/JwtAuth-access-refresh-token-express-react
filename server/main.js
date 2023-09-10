import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./src/module/user/user.router.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
    console.log('Server running on port:' + process.env.PORT);
})