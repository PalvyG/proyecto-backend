import { DaoMDBBase } from "./dao-mdb-base.js";
import { modelTicket } from "./models/model-ticket.js";

export class DaoMDBTicket extends DaoMDBBase{
    constructor(){
        super(modelTicket);
    }

    async createTicket(ticket) {
        try {
            const newTicket = await modelTicket.create({
                ...ticket,
                created_at: new Date()
            })
            return newTicket
        } catch (err) { console.log(err) }
    }
}