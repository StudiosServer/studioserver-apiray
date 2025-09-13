const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos del emoji
router.get('/shorten/tinyurl', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: true,
            message: 'El parámetro de consulta "query=https://google.com" ejemplo',
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/shorten/tinyurl?url=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            data: response.data.data
        });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;
