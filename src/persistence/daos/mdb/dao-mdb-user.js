import { userModel } from './models/model-user.js';
import { createHash, isValidPassword } from '../../utils.js';

export class DaoMDBUser {
    constructor() { }
    async createUser(user) {
        try {
            const findUser = await userModel.findOne({ email: user.email })
            if (!findUser) {
                if (user.email.includes('.admin') && user.password.includes('.admin')) {
                    const newAdmin = await userModel.create({ ...user, password: createHash(user.password), role: 'admin' })
                    return newAdmin
                } else {
                    const newUser = await userModel.create({ ...user, password: createHash(user.password) });
                    return newUser
                }
            }
        } catch (err) { console.log(err) }
    }

    async loginUser(user) {
        try {
            const findUser = await userModel.findOne({ email: user.email })
            if (findUser) {
                const passValid = isValidPassword(user.password, findUser)
                const result = passValid ? findUser : false
                return result
            } else { return null }
        } catch (err) { console.log(err) }
    }

    async getUserByEmail(email) {
        try {
            const findUser = await userModel.findOne({ email: email });
            const result = findUser ? findUser : false;
            return result
        } catch (err) { console.log(err) }
    }

    async getUserById(id) {
        try {
            const findUser = await userModel.findById(id);
            const result = findUser ? findUser : false;
            return result
        } catch (err) { console.log(err) }
    }
}