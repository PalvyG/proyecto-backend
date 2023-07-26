import { Schema, model } from 'mongoose';

const schemaUser = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartId: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, default: 'user' },
    access: { type: String, default: 'local' }
})

schemaUser.pre('findOne', function () {
    this.populate('carts._id');
});

export const modelUser = model('users', schemaUser);