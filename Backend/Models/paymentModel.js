// Payment Model
const paymentSchema = new mongoose.Schema({
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a User model exists for the provider
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit card', 'cash', 'UPI'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);