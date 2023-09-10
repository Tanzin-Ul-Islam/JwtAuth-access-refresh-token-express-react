import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
class DB {
    constructor() {
        this.pool = mysql.createPool({
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            connectionLimit: 10
        })
    }
    query = (sql, values) => {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, values, async (error, result, field) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            })
        })
    }
}

export default new DB;