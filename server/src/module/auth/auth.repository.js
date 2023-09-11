import db from "../../../config/db.config.js";
class AuthRepository {
    async createRefreshToken(arg) {
        try {
            let { token, userId } = arg;
            let sql = 'INSERT INTO refresh_token (token, userId) VALUES (?, ?)'
            let result = await db.query(sql, [token, userId]);
            return result;
        } catch (error) {
            return;
        }
    }
    async findByToken(token) {
        try {
            let sql = 'select * from refresh_token where token = ?';
            let result = await db.query(sql, [token]);
            if (result.length > 0) {
                return result[0];
            }
            return;
        } catch (error) {
            return;
        }
    }
    async deleteToken(token) {
        try {
            if (token) {
                let sql = 'DELETE FROM refresh_token WHERE token = ?';
                let result = await db.query(sql, [token]);
            }
            return;
        } catch (error) {
            return;
        }
    }
}

export default new AuthRepository;