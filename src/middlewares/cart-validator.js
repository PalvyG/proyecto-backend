import factory from "../persistence/factory.js";
const { daoUser } = factory

export const cartBodyValidation = async (req, res, next) => {
    try {
        const cart = req.body
        if (!cart.products || cart.products.length === 0) {
            res.status(400).json({
                message: '(!) Invalid or missing property or value.',
                details: "(i) Cart must be updated with at least 1 product. For deletion of all products, please use the delete request."
            })
        } else {
            next();
        }
    } catch (err) { console.log(err) }
}

export const cartUserValidation = async (req, res, next) => {
    try {
        const isLoggedIn = req.session.passport
        if (isLoggedIn) {
            const user = await daoUser.getById(req.session.passport.user)
            if (user.cartId.toString() === req.params.cid) {
                next()
            } else {
                res.status(403).json({ message: "(!) You are not authorized to access this endpoint." })
            }
        } else {
            res.status(400).json({ message: "(!) You must be logged in as an administrator to access this endpoint." })
        }
    } catch (err) { console.log(err) }
}