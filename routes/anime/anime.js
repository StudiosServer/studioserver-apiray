const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para la API de búsqueda de anime
router.get('/anime/anime', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/anime/animesearch?query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        const modifiedResponse = {
            creator: 'Studio Server',
            status: response.data.status,
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
