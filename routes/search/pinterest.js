const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para imágenes de Pinterest
router.get('/search/pinterest', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: true,
            message: 'El parámetro de consulta "text" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/pinterest?text=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            result: response.data.result
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
