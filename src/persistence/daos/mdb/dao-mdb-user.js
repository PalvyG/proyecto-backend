import { modelUser } from './models/model-user.js';
import { DaoMDBBase } from "./dao-mdb-base.js";
import { createHash, isValidPassword } from '../../../utils.js';

export class DaoMDBUser extends DaoMDBBase{
    constructor() { 
        super(modelUser)
    }

    async createUser(user) {
        try {
            const findUser = await this.model.findOne({ email: user.email })
            if (!findUser) {
                if (user.email.includes('.admin') && user.password.includes('.admin')) {
                    const newAdmin = await this.model.create({ ...user, password: createHash(user.password), role: 'admin' })
                    return newAdmin
                } else {
                    const newUser = await this.model.create({ ...user, password: createHash(user.password) });
                    return newUser
                }
            }
        } catch (err) { console.log(err) }
    }

    async loginUser(user) {
        try {
            const findUser = await this.model.findOne({ email: user.email })
            if (findUser) {
                const passValid = isValidPassword(user.password, findUser)
                const result = passValid ? findUser : false
                return result
            } else { return null }
        } catch (err) { console.log(err) }
    }

    async getUserByEmail(email) {
        try {
            const findUser = await this.model.findOne({ email: email });
            const result = findUser ? findUser : false;
            return result
        } catch (err) { console.log(err) }
    }

    async getUserById(id) {
        try {
            const findUser = await this.model.findById(id);
            const result = findUser ? findUser : false;
            return result
        } catch (err) { console.log(err) }
    }
}