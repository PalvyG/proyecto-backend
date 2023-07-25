import { modelCart } from './models/model-cart.js'
import { modelProd } from './models/model-prod.js'
import { DaoMDBBase } from "./dao-mdb-base.js";

export class DaoMDBCart extends DaoMDBBase{
    constructor() {
        super(modelCart)
    }
    
    async createCart() {
        try {
            const response = await this.model.create({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCarts() {
        try {
            const response = await this.model.find({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCartById(id) {
        try {
            const response = await this.model.findById({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async addToCart(cid, pid, qty) {
        try {
            const cart = await this.model.findById({ _id: cid });
            const prod = await modelProd.findById({ _id: pid });
            const index = cart.products.findIndex((obj) => obj._id.toString() == prod._id.toString())
            if (index == 0 || index != -1) {
                const prodPush = {
                    ...prod._doc,
                    qty: cart.products[index].qty + Number(qty)
                }
                cart.products.splice(index, 1, prodPush)
                cart.save();
            } else if (index == -1) {
                const prodPush = {
                    ...prod._doc,
                    qty
                }
                cart.products.push(prodPush)
                cart.save();
            }
            const cartUpd = await this.model.findById({ _id: cid });
            return cartUpd;
        } catch (err) { console.log(err) }
    }

    async updateCart (id, arr) {
        try {
            await this.model.updateOne({_id: id}, {
                $set: {
                    products: arr.products,
                }
            })
            const cart = await this.model.findById(id)
            return cart
        } catch (err) { console.log(err) }
    }

    async deleteProdFromCart(cid, pid) {
        try {
            const cart = await this.model.findById({ _id: cid });
            const prod = await modelProd.findById({ _id: pid });
            const index = cart.products.findIndex((obj) => obj._id.toString() == prod._id.toString())
            if (index == 0 || index != -1) {
                cart.products.splice(index, 1)
                cart.save();
                const cartUpd = await this.model.findById({ _id: cid });
                return cartUpd;
            }
        } catch (err) { console.log(err) }
    }

    async deleteAllProdFromCart(id) {
        try {
            await this.model.updateOne({_id: id}, {
                $set: {
                    products: [],
                }
            })
            const cart = await this.model.findById(id)
            return cart
        } catch (err) { console.log(err) }
    }

    async deleteCart(id) {
        try {
            const response = await this.model.findByIdAndDelete({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAllCart() {
        try {
            const response = await this.model.deleteMany({});
            return response
        } catch (err) { console.log(err) }
    }
}