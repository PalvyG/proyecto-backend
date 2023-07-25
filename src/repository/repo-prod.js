import { RepoBase } from './repo-base.js';
import factory from '../persistence/daos/factory.js';
const { daoProd } = factory

export class RepoProducts extends RepoBase{
    constructor() {
        super(daoProd)
    }

    async addProdSvc(prod) {
        try {
            const newDoc = await this.dao.addProduct(prod)
            if (!newDoc) throw new Error(`(!) Validation error by the service.`)
            else return newDoc
        } catch (err) { console.log(err) }
    }

    async getProdSvc(page, limit, sort, filter) {
        try {
            const docs = await this.dao.getProducts(page, limit, sort, filter);
            return docs
        } catch (err) { console.log(err) }
    }

    async getProdByIdSvc(id) {
        try {
            const doc = await this.dao.getProductById(id);
            if (!doc) throw new Error(`(!) Product not found by the service.`)
            else return doc
        } catch (err) { console.log(err) }
    }

    async updateProdSvc(id, prod) {
        try {
            const oldDoc = await this.dao.getProductById(id)
            if (!oldDoc) {
                throw new Error(`(!) Product not found by the service.`)
            } else {
                const newDoc = await this.dao.updateProduct(id, prod);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteProdSvc(id) {
        try {
            const doc = await this.dao.deleteProduct(id)
            return doc
        } catch (err) { console.log(err) }
    }

    async deleteAllProdSvc() {
        try {
            await this.dao.deleteAllProducts()
        } catch (err) { console.log(err) }
    }
}
