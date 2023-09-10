import db from "../../../config/db.config.js";
class AuthRepository {
    createRefreshToken = async (params) => {
        try {
            let { token, userId } = params;
            let sql = 'INSERT INTO refresh_token (token, userId) VALUES (?, ?)'
            let result = await db.query(sql, [token, userId]);
            return result;
        } catch (error) {
            return;
        }
    }
}

export default new AuthRepository;