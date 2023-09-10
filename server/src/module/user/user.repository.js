import db from "../../../config/db.config.js";
class UserRepository {

    createUser = async (params) => {
        try {
            let { username, email, password } = params;
            let sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
            let result = await db.query(sql, [username, email, password]);
            if (result) {
                const { insertId } = result;
                const user = await this.findById(insertId);
                if (user) {
                    return user;
                }
                return;
            }
            return;
        } catch (error) {
            return;
        }
    }

    findByEmail = async (email) => {
        try {
            let sql = 'select * from users where email = ?';
            const result = await db.query(sql, [email]);
            if (result.length > 0) {
                return result[0];
            }
            return;
        } catch (error) {
            return;
        }
    }
    findById = async (id) => {
        try {
            let sql = 'select * from users where id = ?';
            const result = await db.query(sql, [id]);
            if (result.length > 0) {
                return result[0];
            }
            return;
        } catch (error) {
            return;
        }
    }

    findAll = async () => {
        let sql = "select * from users";
        const result = await db.query(sql);
        return result;

    }

}

export default new UserRepository;