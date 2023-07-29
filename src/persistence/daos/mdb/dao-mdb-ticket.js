import { modelTicket } from "./models/model-ticket.js";

export class DaoMDBTicket {
    constructor() { }

    async getAllTickets() {
        try {
            return await modelTicket.find({})
        } catch (err) { console.log(err) }
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
            const newTicket = await modelTicket.create({
                ...ticket,
                cart: ticket.cart
            })
            return newTicket
        } catch (err) { console.log(err) }
    }
}