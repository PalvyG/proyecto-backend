import { ControllerBase } from "./controller-base.js";
import { RepoTicket } from "../repository/repo-ticket.js";
const repoTicket = new RepoTicket()

export class ControllerTicket extends ControllerBase {
    constructor(){
        super(repoTicket)
    }

    async createTicket(req, res, next) {
        try {
            const ticket = {
                purchaser: req.session.user.email
            }
            const newTicket = await repoTicket.createTicket(ticket)
            return newTicket
        } catch (err) { next(err) }
    }
}