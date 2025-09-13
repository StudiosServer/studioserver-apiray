const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Gelbooru con apikey
router.get('/search/gelbooru', async (req, res) => {
    const query = req.query.query;
    const apiKey = req.query.apikey;

    if (!query || apiKey !== 'studioserver100') {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido y la "apikey" debe ser válida'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/gelbooru?query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            data: response.data.data
        };

        res.json(formattedData);
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
