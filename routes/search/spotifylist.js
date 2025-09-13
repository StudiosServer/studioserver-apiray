const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Spotify Playlist
router.get('/search/spotifyplaylist', async (req, res) => {
    const query = req.query.query;
    const limit = req.query.limit || 3; // Si no se proporciona el parámetro de límite, usa 3 por defecto

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: true,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/spotifyplaylist?q=${encodeURIComponent(query)}&limit=${limit}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            data: {}
        };
        response.data.data.forEach(item => {
            formattedData.data[item.name] = item;
        });

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
