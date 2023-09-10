import AuthRepository from "./auth.repository.js";
import UserRepository from "../user/user.repository.js";
import BcryptService from "../../core/bcrypt.service.js";
import JwtService from "../../core/jwt.service.js";
import UserTransformer from "../../transformer/user.transformer.js";
class AuthService {
    async signUp(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).send({ statusCode: 400, message: "Username, email and password required!" });
                return;
            }
            const userExist = await UserRepository.findByEmail(email);
            if (userExist) {
                res.status(400).send({ statusCode: 400, message: "User already exist with this email!" });
                return;
            }
            const hashPassword = BcryptService.genHash(password);
            const user = await UserRepository.createUser({ username, email, password: hashPassword });
            if (!user) {
                res.status(400).send({ statusCode: 400, message: "Something went wrong! Please try again." });
                return;
            }
            const jwtPayload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            const { jwtAccessToken, jwtRefreshToken } = JwtService.generateJwtTokens(jwtPayload);
            await AuthRepository.createRefreshToken({ token: jwtRefreshToken, userId: user.id });
            res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'none', secure: true });
            res.status(201).send({ message: "Successfully Registered!", user: UserTransformer(user), token: jwtAccessToken });
            return;
        } catch (error) {
            res.status(400).send({ statusCode: 400, message: "Something went wrong! Please try again." });
            return
        }
    }
    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send({ statusCode: 400, message: "Email and password required!" });
                return;
            }
            const user = await UserRepository.findByEmail(email);
            if (!user) {
                res.status(400).send({ statusCode: 400, message: "User not found." });
                return;
            }
            const comparePassHash = BcryptService.compareHash(password, user.password);
            if (!comparePassHash) {
                res.status(400).send({ statusCode: 400, message: "Wrong password!" });
                return;
            }
            const jwtPayload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            const { jwtAccessToken, jwtRefreshToken } = JwtService.generateJwtTokens(jwtPayload);
            await AuthRepository.createRefreshToken({ token: jwtRefreshToken, userId: user.id });
            res.cookie('refreshToken', jwtRefreshToken, { httpOnly: true, sameSite: 'none', secure: true });
            res.status(200).send({ message: "Successfully Registered!", user: UserTransformer(user), token: jwtAccessToken });
            return;
        } catch (error) {
            res.status(400).send({ statusCode: 400, message: "Something went wrong! Please try again." });
            return
        }
    }
}

export default new AuthService;