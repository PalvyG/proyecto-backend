export class RepoBase {
    constructor(daoParam){
        this.dao = daoParam
    }

    async getById(id) {
        try {
            const response = await this.dao.getById(id)
            return response
        } catch (err) { console.log(err) }
    }

    async create(obj) {
        try {
            const response = await this.dao.create(obj)
            return response
        } catch (err) { console.log(err) }
    }

    async update(id, obj) {
        try {
            const response = await this.dao.update(id, obj)
            return response
        } catch (err) { console.log(err) }
    }

    async delete(id) {
        try {
            const response = await this.dao.delete(id);
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAll() {
        try {
            await this.dao.deleteAll()
        } catch (err) { console.log(err) }
    }
}