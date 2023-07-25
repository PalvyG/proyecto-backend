import { RepoBase } from './repo-base.js';
import factory from '../persistence/daos/factory.js';
const { daoCart } = factory

export class RepoCarts extends RepoBase{
    constructor() { 
        super(daoCart)
    }

    async getCartSvc() {
        try {
            const docs = await this.dao.getCarts();
            return docs
        } catch (err) { console.log(err) }
    }

    async getCartByIdSvc(id) {
        try {
            const doc = await this.dao.getCartById(id);
            if (!doc) throw new Error(`(!) Cart not found by the service.`)
            else return doc
        } catch (err) { console.log(err) }
    }

    async createCartSvc() {
        try {
            const newDoc = await this.dao.createCart()
            return newDoc
        } catch (err) { console.log(err) }
    }

    async addToCartSvc(cid, pid, qty) {
        try {
            const oldDoc = await this.dao.getCartById(cid)
            if (!oldDoc) {
                throw new Error(`(!) Cart not found by the service.`)
            } else {
                const newDoc = await this.dao.addToCart(cid, pid, qty);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async updateCartSvc(id, arr) {
        try {
            const oldDoc = await this.dao.getCartById(id);
            if (oldDoc) {
                const newDoc = await this.dao.updateCart(id, arr);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteProdFromCartSvc(cid, pid) {
        try {
            const oldDoc = await this.dao.getCartById(cid)
            if (!oldDoc) {
                throw new Error(`(!) Cart not found by the service.`)
            } else {
                const newDoc = await this.dao.deleteProdFromCart(cid, pid);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteAllProdFromCartSvc(id) {
        try {
            const oldDoc = await this.dao.getCartById(id);
            if (oldDoc) {
                const newDoc = await this.dao.deleteAllProdFromCart(id);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteCartSvc(id) {
        try {
            const doc = await this.dao.deleteCart(id)
            return doc
        } catch (err) { console.log(err) }
    }

    async deleteAllCartSvc() {
        try {
            await this.dao.deleteAllCart()
        } catch (err) { console.log(err) }
    }
}