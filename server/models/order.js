const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantName: { type: String, required: true },
  items: [{ name: String, quantity: { type: Number, min: 1 } }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'cancelled'], // Example statuses
    default: 'pending' 
  }
});


module.exports = mongoose.model('Order', OrderSchema);
