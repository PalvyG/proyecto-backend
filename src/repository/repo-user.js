import factory from '../persistence/factory.js';
const { daoUser } = factory

export class RepoUser {
    constructor() { }

    async createUserSvc(user) {
        try {
            const newDoc = await daoUser.createUser(user)
            return newDoc
        } catch (err) { console.log(err) }
    }

    async loginUserSvc(user) {
        try {
            const doc = await daoUser.loginUser(user)
            return doc
        } catch (err) { console.log(err) }
    }
}