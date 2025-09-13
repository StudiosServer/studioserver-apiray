const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener la imagen NSFW
router.get('/nsfw/grils', async (req, res) => {
    const apiKey = req.query.apikey;
    if (apiKey !== 'studioserver100') {
        return res.status(401).json({
            creator: 'Studio Server',
            status: true,
            message: 'Se requiere apikey. API restringida.'
        });
    }

    try {
        const apiURL = 'https://delirius-apiofc.vercel.app/nsfw/girls';
        const response = await axios.get(apiURL, { responseType: 'arraybuffer' });

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(response.data);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;
