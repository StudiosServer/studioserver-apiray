const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de análisis de edad
router.get('/ia/age', async (req, res) => {
    const imageUrl = req.query.query;
    const language = req.query.language || 'es'; // Si no se especifica el idioma, se usa 'es'

    if (!imageUrl) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "?query=se necesita url de una imagen" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/ia/age?image=${encodeURIComponent(imageUrl)}&language=${encodeURIComponent(language)}`;
        const response = await axios.get(apiURL);

        const modifiedResponse = {
            creator: 'Studio Server',
            status: true,
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
