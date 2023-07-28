import { DaoMDBBase } from "./dao-mdb-base.js";
import { modelTicket } from "./models/model-ticket.js";

export class DaoMDBTicket extends DaoMDBBase{
    constructor(){
        super(modelTicket);
    }

    async getUserTicket(email) {
        try {
            const arrTicket = await modelTicket.find({
                purchaser: email
            })
            return arrTicket
        } catch (err) { console.log(err) }
    }

    async createTicket(ticket) {
        try {
            const newTicket = await modelTicket.create(ticket)
            return newTicket
        } catch (err) { console.log(err) }
    }
}