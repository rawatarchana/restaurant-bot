const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: String,
  date: Date,
  specialRequests: String,
  status: { type: String, enum: ['active', 'canceled'], default: 'active' }, // Add status field
});

module.exports = mongoose.model('Reservation', ReservationSchema);
