const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Rule34 con apikey
router.get('/search/rule34', async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 0; // Si no se proporciona el parámetro de página, usa 0 por defecto
    const apiKey = req.query.apikey;

    if (!query || apiKey !== 'studioserver100') {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido y la "apikey" consiguelo'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/rule34v2?query=${encodeURIComponent(query)}&page=${page}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            total: response.data.total,
            code: response.data.code,
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
