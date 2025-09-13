const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para la API de noticias de anime
router.get('/anime/newsanime', async (req, res) => {
    try {
        const apiURL = 'https://delirius-apiofc.vercel.app/anime/newsanime';
        const response = await axios.get(apiURL);

        const modifiedResponse = {
            creator: 'Studio Server',
            status: true,
            data: response.data.data
        };

        res.json(modifiedResponse);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({
            creator: 'Studio Server',
            status: false,
            message: 'developing system'
        });
    }
});

module.exports = router;
