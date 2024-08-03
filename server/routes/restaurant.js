const express = require('express');
const router = express.Router();
const { findPlaceFromText } = require('../utils/apiClient');

router.get('/search', async (req, res) => {
  const { input } = req.query; // Search query from the user
  try {
    const results = await findPlaceFromText(input);
    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
