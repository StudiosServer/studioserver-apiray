const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to fetch Reddit video data
router.get('/download/reddit', async (req, res) => {
  const redditUrl = req.query.query; // Get the URL from the query parameters

  if (!redditUrl) {
    return res.status(400).json({ error: 'Reddit URL is required as a query parameter (e.g., ?url=...).' });
  }

  try {
    const apiUrl = 'https://submagic-free-tools.fly.dev/api/reddit-download';

    // Make the POST request to the API, sending the URL in the body
    const apiResponse = await axios.post(apiUrl, { url: redditUrl }, {
      headers: {
        'Content-Type': 'application/json', // Important: Set Content-Type to application/json
      }
    });

    // Check if the API request was successful (status code 200-299)
    if (apiResponse.status < 200 || apiResponse.status >= 300) {
      return res.status(apiResponse.status).json({ error: 'API request failed', apiResponse: apiResponse.data });
    }

    // Extract the data from the API response
    const apiData = apiResponse.data;

    // Create the structured JSON response
    const structuredData = {
      creator: 'Studio Server',
      status: true,
      data: apiData // Embed the API response directly into the data field
    };

    // Send the structured JSON response back to the client
    res.status(200).json(structuredData);

          // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status || 500).json({ error: 'API request failed', apiResponse: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: 'No response from API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: 'Request setup error', message: error.message });
    }
  }
});

module.exports = router;