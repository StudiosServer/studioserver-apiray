const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/ttp', async (req, res) => {
    const query = req.query.query;
    const color = req.query.color;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=studio server welcome!" ejemplo requerido' });
    }

    if (!color) {
        return res.status(400).json({ error: 'El parámetro de consulta "color=blue" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/ttp?text=${encodeURIComponent(query)}&color=${encodeURIComponent(color)}`;
        const response = await axios.get(apiURL, { responseType: 'arraybuffer' });

        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;
