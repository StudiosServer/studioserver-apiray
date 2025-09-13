const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/tools/googlenews', async (req, res) => {
    const country = req.query.country;
    const language = req.query.language;
    if (!country) {
        return res.status(400).json({ message: 'El parámetro de consulta "country" es requerido' });
    }

    if (!language) {
        return res.status(400).json({ message: 'El parámetro de consulta "language" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/noticias?language=${encodeURIComponent(language)}&country=${encodeURIComponent(country)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            result: response.data.headline_stories
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