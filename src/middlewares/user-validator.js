export const userValidator = (req, res, next) => {
    try {
        const user = req.body;
        if (user.firstname !== undefined && user.lastname !== undefined && user.email !== undefined && user.password !== undefined ) {
            if(user.age >= 18) {
                next()
            } else {
                res.status(400).json({message:'(!) You must be at least 18 years old to register.'})
            }
        } else {
            res.status(400).json({
                message: '(!) Invalid or missing property or value.',
                details: "(i) Product must contain the following properties: title, desc, price, stock, cat, status, code."
            })
        }
    } catch (err) { console.log(err) }
}