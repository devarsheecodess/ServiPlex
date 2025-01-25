const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
    },
    owner: {
        type: String,
    },
    profession: {
        type: String,
    },
    shop: {
        type: String,
    },
    logo: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
    }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;