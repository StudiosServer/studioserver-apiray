const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/phub', async (req, res) => {
    const query = req.query.query;
    const name = req.query.name;
    const text = req.query.text;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=url image" ejemplo requerido' });
    }

    if (!name) {
        return res.status(400).json({ error: 'El parámetro de consulta "name=shino" ejemplo requerido' });
    }
    if (!text) {
        return res.status(400).json({ error: 'El parámetro de consulta "text=welcome to Studio Server!!" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/phub?image=${encodeURIComponent(query)}&username=${encodeURIComponent(name)}&text=${encodeURIComponent(text)}`;
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
