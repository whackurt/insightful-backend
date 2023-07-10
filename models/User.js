const mongoose = require('mongoose');
const {Schema, model} = mongoose

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const UserModel = model('User', UserSchema)

module.exports = UserModel;