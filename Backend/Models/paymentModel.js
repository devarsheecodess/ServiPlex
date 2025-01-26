// Payment Model
const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Provider" },
  upiId: { type: String, required: true },
  bankAccountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  accountHolderName: { type: String, required: true },
});
  module.exports = mongoose.model('Payment', PaymentSchema);