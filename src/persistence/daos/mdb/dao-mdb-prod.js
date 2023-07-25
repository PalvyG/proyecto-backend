import { modelProd } from "./models/model-prod.js";
import { DaoMDBBase } from "./dao-mdb-base.js";

export class DaoMDBProduct extends DaoMDBBase{
    constructor() {
        super(modelProd)
    }

    async addProduct(prod) {
        try {
            const response = await this.model.create(prod)
            return response;
        } catch (err) { console.log(err) }
    }

    async getProducts(page = 1, limit = 5, sort, filter) {
        try {
            if (sort == 'asc' || sort == 'desc') {
                const response = await this.model.paginate(filter != undefined ? {cat: filter} : {}, { page, limit, sort: {price: sort} })
                return response
            } else if (sort != 'asc' && sort != 'desc') {
                const response = await this.model.paginate(filter != undefined ? {cat: filter} : {}, { page, limit })
                return response
            }
        } catch (err) { console.log(err) }
    }

    async getProductById(id) {
        try {
            const response = await this.model.findById(id)
            return response
        } catch (err) { console.log(err) }
    }

    async updateProduct(id, prod) {
        try {
            await this.model.updateOne({ _id: id }, prod)
            return prod
        } catch (err) { console.log(err) }
    }

    async deleteProduct(id) {
        try {
            const response = await this.model.findByIdAndDelete({ _id: id })
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAllProducts() {
        try {
            await this.model.deleteMany({})
        } catch (err) { console.log(err) }
    }
}