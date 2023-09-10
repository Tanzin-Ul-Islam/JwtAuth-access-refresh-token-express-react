import JwtAuthService from "../core/common/jwt/jwt.service.js";
import UserRepository from "../module/user/user.repository.js";
class AuthMiddleware {
    async authGuardMiddleware(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            res.status(403).send({ statusCode: 403, message: "Fobidden resource!" });
            return;
        }
        authToken = authToken.split('Bearer ')[1];
        let verifyToken = JwtAuthService.decodeJwtAccessToken(authToken);
        if (!verifyToken) {
            res.status(401).send({ statusCode: 401, message: "Invalid token!" });
            return;
        }

        let verifyUser = await UserRepository.findByEmail(verifyToken.email);
        if (!verifyUser) {
            res.status(400).send({ statusCode: 400, message: "User not found!" });
            return;
        }
        let userInfo = { id: verifyUser.id, email: verifyUser.email, username: verifyUser.username };
        res.locals.userInfo = userInfo;
        next();
    }
}
export default new AuthMiddleware;