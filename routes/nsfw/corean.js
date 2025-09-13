const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener la imagen NSFW
router.get('/nsfw/corean', async (req, res) => {
    const apiKey = req.query.apikey;
    if (apiKey !== 'studioserver100') {
        return res.status(401).json({ error: 'Acceso no autorizado. Se requiere una API key válida.' });
    }

    try {
        const apiURL = 'https://delirius-apiofc.vercel.app/nsfw/corean';
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
