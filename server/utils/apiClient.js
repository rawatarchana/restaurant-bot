const axios = require('axios');
require('dotenv').config(); // To load environment variables from .env

const findPlaceFromText = async (input) => {
  const options = {
    method: 'GET',
    url: 'https://map-places.p.rapidapi.com/findplacefromtext/json',
    params: {
      input: input, // The search query text
      inputtype: 'textquery',
      fields: 'formatted_address,name,rating,opening_hours,geometry'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Store your API key in .env
      'x-rapidapi-host': 'map-places.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from Google Maps Places API: ${error.message}`);
  }
};

module.exports = { findPlaceFromText };
