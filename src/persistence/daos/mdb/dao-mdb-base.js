export class DaoMDBBase {
    constructor(modelParam) {
        this.model = modelParam;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (err) { console.log(err) }
    }

    async getById(id) {
        try {
            const findId = await this.model.findById(id);
            const response = findId ? findId : false;
            return response;
        } catch (err) { console.log(err) }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (err) { console.log(err) }
    }

    async update(id, obj) {
        try {
            const findId = await this.model.getById(id)
            if (findId) {
                await this.model.updateOne({ _id: id }, obj)
                return obj
            } else return false
        } catch (err) { console.log(err) }
    }

    async delete(id) {
        try {
            const findId = await this.model.findByIdAndDelete(id);
            const response = findId ? findId : false;
            return response;
        } catch (err) { console.log(err) }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({})
        } catch (err) { console.log(err) }
    }
}