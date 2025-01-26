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
        required: true,
        unique: true,
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
    coordinates: {
        type: {
          lat: Number, // Latitude
          lng: Number, // Longitude
        },
        required: false,
      },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Provider', providerSchema);