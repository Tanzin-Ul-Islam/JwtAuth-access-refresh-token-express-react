import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class JwtAuthService {
    generateAccessToken(arg) {
        const token = jwt.sign(arg, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m' });
        return token;
    }
    generateRefreshToken(arg) {
        const token = jwt.sign(arg, process.env.JWT_REFRESH_SECRET, { expiresIn: '4m' });
        return token;
    }

    decodeJwtAccessToken(token) {
        try {
            const response = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return response;
        } catch (error) {
            return;
        }
    }
    decodeJwtRefreshToken(token) {
        try {
            const response = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return response;
        } catch (error) {
            return;
        }
    }

    generateJwtTokens(arg) {
        const jwtAccessToken = this.generateAccessToken(arg);
        const jwtRefreshToken = this.generateRefreshToken(arg);
        return {
            jwtAccessToken,
            jwtRefreshToken
        }

    }
}

export default new JwtAuthService;