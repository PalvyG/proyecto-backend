import { Schema, model } from 'mongoose';

const schemaTicket = new Schema({
    code: { type: String, required: true },
    created_at: { type: Date, required: true },
    purchaser: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'carts' }
})

export const modelTicket = model('tickets', schemaTicket);