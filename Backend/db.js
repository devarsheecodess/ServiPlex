const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
    },
    specialOffers: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const providerSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    services: [serviceSchema], // Embedding services within the provider schema
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
