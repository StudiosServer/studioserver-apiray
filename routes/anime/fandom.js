const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para la API de búsqueda de anime
router.get('/anime/fandom', async (req, res) => {
    const input = req.query.input;
    const query = req.query.query;
    const limit = req.query.limit;

    if (!input) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "input=anime" es ejemplo'
        });
    }

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query=onimai" es requerido'
        });
    }

    if (!limit) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "limit=10" es ejemplo'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/anime/wikia?fandom=${encodeURIComponent(input)}&query=${encodeURIComponent(query)}&limit=${encodeURIComponent(limit)}`;
        const response = await axios.get(apiURL);

        const modifiedResponse = {
            creator: 'Studio Server',
            status: response.data.status,
            data: response.data.data
        };

        res.json(modifiedResponse);z
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
