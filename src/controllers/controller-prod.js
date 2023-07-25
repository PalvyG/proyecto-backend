import { ControllerBase } from "./controller-base.js";
import { RepoProducts } from "../repository/repo-prod.js";
const repoProd = new RepoProducts();

export class ControllerProducts extends ControllerBase {
    constructor() {
        super(repoProd)
    }

    async addProdCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await this.repo.addProdSvc(newDoc)
            res.status(200).json({ message: "(i) Product added successfully!", product: newDocPost })
        } catch (err) { next(err) }
    }

    async getProdCtrl(req, res, next) {
        try {
            let { page, limit, sort, filter } = req.query
            page == null ? page = 1 : page = page
            const result = await this.repo.getProdSvc(page, limit, sort, filter);
            const prevPageLink = result.hasPrevPage ? `http://localhost:8080/users?page=${result.prevPage}` : null
            const nextPageLink = result.hasNextPage ? `http://localhost:8080/users?page=${result.nextPage}` : null
            res.json({
                status: result ? 'success' : 'error',
                payload: result.docs,
                info: {
                    totalDocs: result.totalDocs,
                    totalPages: result.totalPages,
                    currPage: Number(page),
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevPageLink,
                    nextPageLink
                }
            });
        } catch (err) { next(err) }
    }

    async getProdByIdCtrl(req, res, next) {
        try {
            const { pid } = req.params
            const doc = await this.repo.getProdByIdSvc(pid)
            doc ? res.status(200).json({ message: '(i) Product found successfully!', product }) : res.status(404).json({ message: '(!) Product not found by the controller.' })
            res.json(doc)
        } catch (err) { next(err) }
    }

    async updateProdCtrl(req, res, next) {
        try {
            const { title, desc, price, stock, cat, status, thumb } = req.body;
            const newDoc = { title, desc, price, stock, cat, status, thumb }
            const { pid } = req.params;
            const oldDoc = await this.repo.getProdByIdSvc(pid)
            if (oldDoc) {
                await this.repo.updateProdSvc(pid, newDoc)
                res.status(200).json({ message: `(i) "${newDoc.title}" (ID: ${pid}) was successfully updated!`, update: newDoc })
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteProdCtrl(req, res, next) {
        try {
            const { pid } = req.params;
            const doc = await this.repo.getProdByIdSvc(pid)
            if (doc) {
                res.status(200).json({ message: `(i) "${doc.title}" was deleted successfully. (ID: ${pid})` })
                await this.repo.deleteProdSvc(pid)
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteAllProdCtrl(req, res, next) {
        try {
            await this.repo.deleteAllProdSvc()
            res.status(200).json({ message: "(i) All products deleted successfully" })
        } catch (err) { next(err) }
    }
}
