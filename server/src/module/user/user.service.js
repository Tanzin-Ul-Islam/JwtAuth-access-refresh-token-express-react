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
}

export default new UserService;