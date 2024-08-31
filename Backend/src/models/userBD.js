// Modelo de Usuario (User)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    providerId: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);