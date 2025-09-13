const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/gaycard', async (req, res) => {
    const query = req.query.query;
    const name = req.query.name;
    const rank = req.query.rank;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=url de imagen" ejemplo requerido' });
    }
    if (!name) {
        return res.status(400).json({ error: 'El parámetro de consulta "name=yahomi" ejemplo requerido' });
    }
    if (!rank) {
        return res.status(400).json({ error: 'El parámetro de consulta "rank=50" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/gaycard?url=${encodeURIComponent(query)}&name=${encodeURIComponent(name)}&rank=${encodeURIComponent(rank)}`;
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
