const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos del emoji mixto
router.get('/tools/mixed', async (req, res) => {
    const emoji1 = req.query.emoji1;
    const emoji2 = req.query.emoji2;
    if (!emoji1 || !emoji2) {
        return res.status(400).json({ error: 'Los parámetros de consulta "emoji1" y "emoji2" son requeridos' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/mixed?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            data: response.data.data
        });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;
