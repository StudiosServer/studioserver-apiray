const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Wallhaven
router.get('/search/wallhaven', async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 1;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "q" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/wallhaven?q=${encodeURIComponent(query)}&page=${page}`;
        const response = await axios.get(apiURL);

        const formattedData = response.data.data.map(item => item);

        res.json({
            creator: 'Studio Server',
            status: true,
            data: formattedData
        });
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
