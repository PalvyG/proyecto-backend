import { Schema, model } from 'mongoose'
const schemaMsg = new Schema({
    message: {type: String, required: true}
})

export const modelMsg = model(
    'messages',
    schemaMsg
);