const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const User = require('../models/user'); // Assuming you have a User model

router.post('/', async (req, res) => {
  const { userId, restaurantId, date, specialRequests } = req.body;

  try {
    // Check if user exists
    let user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: 'User not logged in or registered. Please register first.',
        registrationLink: 'http://localhost:5000/api/users/register'
      });
    }

    // Check for overlapping reservations at the same restaurant and date
    const existingReservation = await Reservation.findOne({
      restaurantId,
      date,
      status: { $ne: 'canceled' } // Ensure the reservation is not canceled
    });

    if (existingReservation) {
      return res.status(400).send('The time slot is already reserved.');
    }

    // Create the reservation
    const reservation = new Reservation({
      userId,
      restaurantId,
      date,
      specialRequests,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
