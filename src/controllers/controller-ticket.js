import { ControllerBase } from "./controller-base.js";
import { RepoTicket } from "../repository/repo-ticket.js";
import factory from "../persistence/factory.js";
const { daoUser, daoCart } = factory
const repoTicket = new RepoTicket()

export class ControllerTicket extends ControllerBase{
    constructor() {
        super(ControllerBase)
    }

    async getUserTicket(req, res, next) {
        try {
            const userFind = await daoUser.getUserById(req.session.passport.user)
            const arrTicket = await repoTicket.getUserTicket(userFind.email)
            if(arrTicket.length < 0) {
                res.status(404).json({
                    message: "(!) You have no tickets in process.", 
                    tip: "(i) Check out our products!",
                    endpoint: "/products"
                })
            } else if(arrTicket.length > 0) {
                res.status(200).json({message: "(i) Tickets retrieved successfully.", tickets: arrTicket})
            } else res.status(500).json({message: "(!) Something went wrong.", error: "(i) Internal server error."})
        } catch (err) { next(err) }
    }

    async createTicket(req, res, next) {
        try {
            const userFind = await daoUser.getUserById(req.session.passport.user)
            const userCart = await daoCart.getCartById(userFind.cartId)
            const newCode = async () => { return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36) }
            const newDate = new Date()
            const currDate = newDate.toUTCString()
            const ticket = {
                code: await newCode(),
                created_at: currDate,
                purchaser: userFind.email,
                cart: userCart
            }
            const response = await repoTicket.createTicket(ticket)
            res.status(200).json({ message: "(i) Ticket created successfully.", ticket: response })
        } catch (err) { next(err) }
    }
}