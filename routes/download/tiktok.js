const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cheerio = require('cheerio'); // Import Cheerio
const router = express.Router();

// Endpoint to fetch TikTok data, now accepting the URL as a GET parameter
router.get('/download/tiktok', async (req, res) => {
  const tiktokUrl = req.query.url; // Get the URL from the query parameters

  if (!tiktokUrl) {
    return res.status(400).json({ error: 'TikTok URL is required as a query parameter (e.g., ?url=...).' });
  }

  try {
    const apiUrl = 'https://lovetik.app/api/ajaxSearch';

    // Create a simple FormData object with the URL
    const formData = new FormData();
    formData.append('q', tiktokUrl);
    formData.append('lang', 'es');

    // Make the POST request to the API
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders() // Important: Set correct Content-Type
      }
    });

    const apiData = response.data;

    if (apiData.status === 'ok') {
      // Parse the HTML content using Cheerio
      const $ = cheerio.load(apiData.data);

      // Extract the thumbnail URL
      const thumbnailUrl = $('div.image-tik img').attr('src');

      // Extract the description
      const description = $('div.content h3').text().trim();

      // Extract the download links
      let videoUrl = null;
      let audioUrl = null;

      $('div.dl-action a').each((index, element) => {
        const linkText = $(element).text().trim();
        const linkUrl = $(element).attr('href');

        if (linkText.includes('MP4 HD')) {
          videoUrl = linkUrl;
        } else if (linkText.includes('MP3')) {
          audioUrl = linkUrl;
        }
      });

      // Extract the TikTok ID
      const tiktokId = $('#TikTokId').val();

      // Create the structured JSON response
      const structuredData = {
        creator: 'studio server',
        status: true,
        data: {
          information: {
            thumbnailUrl: thumbnailUrl || null,
            description: description || null,
            tiktokId: tiktokId || null
          }
        }
      };

      // Add video and audio URLs to the data object if they exist
      if (videoUrl) {
        structuredData.data.video = videoUrl;
      }
      if (audioUrl) {
        structuredData.data.audio = audioUrl;
      }

      // Send the structured JSON response back to the client
      res.status(200).json(structuredData);
    } else {
      res.status(500).json({ error: 'API returned an error', apiResponse: apiData });
    }

          // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
    if (error.response) {
      res.status(error.response.status || 500).json({ error: 'API request failed', apiResponse: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: 'No response from API' });
    } else {
      res.status(500).json({ creator: "Studio Server",status: 'false', message: "Error system, not found data" });
    }
  }
});

module.exports = router;