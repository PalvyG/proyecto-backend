import {Schema, model} from 'mongoose';

const userSchema = new Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    access: {type: String, default: 'local'}
})

export const userModel = model('users', userSchema);