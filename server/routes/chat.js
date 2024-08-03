const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace these with your actual API routes
const orderApi = 'http://localhost:3000/api/orders';
const reservationApi = 'http://localhost:5000/api/reservations';
const findFoodApi = 'http://localhost:3000/api/search';

router.post('/', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let botReply = "I didn't understand that. Can you please repeat?";

  try {
    if (userMessage.includes('hi') || userMessage.includes('hello')) {
      botReply = "Hi! How can I assist you today? You can ask me to place an order, make a reservation, find a place, or find food nearby.";
    } else if (userMessage.includes('place order')) {
      botReply = "Sure! Please provide your order details.";
      // Example of how you might direct the user to provide order details
    } else if (userMessage.includes('place reservation')) {
      botReply = "I'd be happy to help with your reservation. Please provide the details.";
      // Example of how you might direct the user to provide reservation details
    } else if (userMessage.includes('find food near') || userMessage.includes('find place')) {
      // Handle find food place logic
      const location = userMessage.replace('find food near', '').trim();
      const response = await axios.get(findFoodApi, { params: { input: location } });
      const places = response.data.candidates || [];
      if (places.length > 0) {
        const placeNames = places.map(place => place.name).join(', ');
        botReply = `Here are some food places near you: ${placeNames}`;
      } else {
        botReply = 'No food places found nearby.';
      }
    } else {
      botReply = "Sorry, I didn't understand that.";
    }
  } catch (error) {
    botReply = `Sorry, something went wrong: ${error.message}`;
  }

  res.json({ reply: botReply });
});

module.exports = router;
