import { modelCart } from './models/model-cart.js'
import { modelProd } from './models/model-prod.js'

export class DaoMDBCart {
    constructor() { };
    async createCart() {
        try {
            const response = await modelCart.create({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCarts() {
        try {
            const response = await modelCart.find({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCartById(id) {
        try {
            const response = await modelCart.findById({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async addToCart(cid, pid, qty) {
        try {
            const cart = await modelCart.findById({ _id: cid });
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
            const cartUpd = await modelCart.findById({ _id: cid });
            return cartUpd;
        } catch (err) { console.log(err) }
    }

    async updateCart (id, arr) {
        try {
            await modelCart.updateOne({_id: id}, {
                $set: {
                    products: arr.products,
                }
            })
            const cart = await modelCart.findById(id)
            return cart
        } catch (err) { console.log(err) }
    }

    async deleteProdFromCart(cid, pid) {
        try {
            const cart = await modelCart.findById({ _id: cid });
            const prod = await modelProd.findById({ _id: pid });
            const index = cart.products.findIndex((obj) => obj._id.toString() == prod._id.toString())
            if (index == 0 || index != -1) {
                cart.products.splice(index, 1)
                cart.save();
                const cartUpd = await modelCart.findById({ _id: cid });
                return cartUpd;
            }
        } catch (err) { console.log(err) }
    }

    async deleteAllProdFromCart(id) {
        try {
            await modelCart.updateOne({_id: id}, {
                $set: {
                    products: [],
                }
            })
            const cart = await modelCart.findById(id)
            return cart
        } catch (err) { console.log(err) }
    }

    async deleteCart(id) {
        try {
            const response = await modelCart.findByIdAndDelete({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAllCart() {
        try {
            const response = await modelCart.deleteMany({});
            return response
        } catch (err) { console.log(err) }
    }
}