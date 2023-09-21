import UserRepository from "./user.repository.js";
class UserService {
    async getAll(req, res) {
        try {
            const result = await UserRepository.findAll();
            res.status(200).send({ statusCode: 200, data: result });
        } catch (error) {
            return
        }
    }
    async getProfile(req, res) {
        try {
            const { id } = res.locals.userInfo;
            const result = await UserRepository.findById(id);
            res.status(200).send({ statusCode: 200, data: result });
            return;
        } catch (error) {
            return
        }
    }
}

export default new UserService;