const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/tools/postimage', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=url image" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/postimage?image=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            result: response.data.data
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