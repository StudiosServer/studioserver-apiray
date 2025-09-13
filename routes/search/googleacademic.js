const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Google Academic
router.get('/search/googleacademic', async (req, res) => {
    const query = req.query.query;
    const language = req.query.language || 'en'; // Si no se proporciona el parámetro de idioma, usa 'en' por defecto

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "q" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/googleacademic?q=${encodeURIComponent(query)}&language=${language}`;
        const response = await axios.get(apiURL);

        const formattedData = {
            creator: 'Studio Server',
            status: true,
            data: {}
        };
        response.data.data.forEach(item => {
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
