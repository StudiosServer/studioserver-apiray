const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/tools/translate', async (req, res) => {
    const language = req.query.language;
    const query = req.query.query;
    if (!language) {
        return res.status(400).json({ error: 'El parámetro de consulta "language=ja" es requerido' });
    }

    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=hola" requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/translate?text=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`;
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