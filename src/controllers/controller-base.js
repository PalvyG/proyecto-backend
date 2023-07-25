export class ControllerBase {
    constructor(repoParam) {
        this.repo = repoParam
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.repo.getAll();
            res.status(200).json(items)
        } catch (err) { next(err) }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.repo.getById(id);
            if (!item) res.status(404).json({message: "(!) Could not found item with specified ID."})
            else res.status(200).json({message: "(i) Item found successfully.", item: item})
        } catch (err) { next(err) }
    };

    create = async (req, res, next) => {
        try {
            const newItem = await this.repo.create(req.body);
            if (!newItem) res.status(404).json({message: "(!) Validation error."})
            else res.status(200).json({message: "(i) New item created successfully.", item: newItem})
        } catch (err) { next(err) }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findItem = await this.repo.getById(id);
            if (!findItem) res.status(404).json({message: "(!) Could not found item with specified ID."})
            const itemUpdated = await this.repo.update(id, req.body);
            res.status(200).json({message: "(i) Item updated successfully.", item: itemUpdated})
        } catch (err) { next(err) }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.repo.getById(id);
            if (!item) res.status(404).json({message: "(!) Could not found item with specified ID."})
            else await this.repo.delete(id);
            res.status(200).json({message: "(i) Item deleted successfully."})
        } catch (err) { next(err) }
    };

    deleteAll = async (req, res, next) => {
        try {
            await this.repo.deleteAll()
            res.status(200).json({message: "(i) All items deleted successfully."})
        } catch (err) { next(err) }
    }
}