import { RepoBase } from './repo-base.js';
import factory from '../persistence/daos/factory.js';
const { daoUser } = factory

export class RepoUser extends RepoBase{
    constructor() { 
        super(daoUser);
    }
    
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