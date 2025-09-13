const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada para Wikipedia
router.get('/search/wikipedia', async (req, res) => {
    const query = req.query.query;
    const limit = req.query.limit || 10; // Límite por defecto en 10 si no se proporciona
    const page = req.query.page || 1; // Página por defecto en 1 si no se proporciona
    const language = req.query.language || 'es'; // Idioma por defecto en español

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/wikipedia?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}&language=${language}`;
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
