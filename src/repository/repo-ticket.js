import { RepoBase } from './repo-base.js';
import factory from '../persistence/factory.js';
const { daoTicket } = factory

export class RepoTicket extends RepoBase {
    constructor() {
        super(daoTicket)
    }

    async getUserTicket(email) {
        try {
            const arrTicket = await daoTicket.getUserTicket(email)
            return arrTicket
        } catch (err) { console.log(err) }
    }

    async createTicket(ticket) {
        try {
            const newTicket = await daoTicket.createTicket(ticket)
            return newTicket           
        } catch (err) { console.log(err) }
    }
}