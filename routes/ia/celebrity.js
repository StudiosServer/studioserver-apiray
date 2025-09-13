const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para la API de predicción de celebridades
router.get('/ia/celebrity', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "?query=una url de una imagen" es requerido'
        });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/ia/celebrity?image=${encodeURIComponent(query)}`;
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
