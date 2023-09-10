import db from "../../../config/db.config.js";
class UserRepository {

    findAll = async () => {
        let sql = "select * from users";
        const result = await db.query(sql);
        return result;

    }
    findByEmail = async (email) => {
        let sql = 'select * from users where email = ?'
        const result = await db.query(sql, [email]);
        return result;
    }

    createUser = async (params) => {
        let { username, email, password } = params;
        let sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
        let result = await db.query(sql, [username, email, password]);
        return result;
    }

}

export default new UserRepository;