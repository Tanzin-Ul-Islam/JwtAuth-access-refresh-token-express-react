import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
class BcryptService {
    genSalt() {
        const salt = bcrypt.genSaltSync(10);
        return salt;
    }
    genHash(password) {
        const salt = this.genSalt();
        const hashPass = bcrypt.hashSync(password, salt);
        return hashPass;
    }
    compareHash(password, hashPass) {
        const compare = bcrypt.compareSync(password, hashPass)
        return compare;
    }
}

export default new BcryptService;