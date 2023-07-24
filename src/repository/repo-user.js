import { DaoMDBUser } from '../persistence/daos/mdb/dao-mdb-user.js'
export const daoUser = new DaoMDBUser();

export class RepoUsers {
    constructor() { }
    
    async createUserSvc(user){
        try {        
            const newDoc = await daoUser.createUser(user)
            return newDoc
        } catch (err) { console.log(err) }
    }

    async loginUserSvc(user){
        try {
            const doc = await daoUser.loginUser(user)
            return doc
        } catch (err) { console.log(err) }
    }
}