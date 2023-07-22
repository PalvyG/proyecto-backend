import { Schema, model } from 'mongoose'
const schemaCart = new Schema({
    products: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        qty: {type: Number},
    }],
})

schemaCart.pre('findOne', function () {
    this.populate('products._id')
})

export const modelCart = model(
    'carts',
    schemaCart
);