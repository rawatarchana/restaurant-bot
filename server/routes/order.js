const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const { findPlaceFromText } = require('../utils/apiClient');

router.post('/', async (req, res) => {
  const { userEmail, restaurantName, items, totalAmount } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }
    const userId = user._id;

    // Search for the restaurant
    const searchResults = await findPlaceFromText(restaurantName);
    const places = searchResults.candidates || [];
    if (places.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    const restaurant = places[0]; // Use the first result, or add more logic to select
    const restaurantNameFromAPI = restaurant.name; // Extract the name of the restaurant

    // Create the order
    const order = new Order({
      userId,
      restaurantName: restaurantNameFromAPI, // Store the restaurant name
      items,
      totalAmount
    });
    await order.save();

    // If payment integration is required
    // const paymentIntent = await createPaymentIntent(totalAmount * 100); // amount in cents
    // res.json({ order, clientSecret: paymentIntent.client_secret });

    res.json({ order });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
