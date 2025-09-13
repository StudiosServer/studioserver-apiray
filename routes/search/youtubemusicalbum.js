const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para álbumes de YouTube Music
router.get('/search/ytsearchalbum', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: true,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/ytsearchalbum?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            totalAlbumList: response.data.totalAlbumList,
            timestamp: response.data.timestamp,
            query: response.data.query,
            data: {}
        };
        response.data.listItem.forEach(item => {
            formattedData.data[item.title] = item;
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
