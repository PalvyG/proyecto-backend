export const cartValidator = async (req, res, next) => {
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