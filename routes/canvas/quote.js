const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/quote', async (req, res) => {
    const query = req.query.query;
    const text = req.query.text;
    const footer = req.query.footer;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=url image" ejemplo requerido' });
    }

    if (!text) {
        return res.status(400).json({ error: 'El parámetro de consulta "text=welcome to Studio Server!!" ejemplo requerido' });
    }
    if (!footer) {
        return res.status(400).json({ error: 'El parámetro de consulta "footer=by Studio Server" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/quote?image=${encodeURIComponent(query)}&text=${encodeURIComponent(text)}&footer=${encodeURIComponent(footer)}`;
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
