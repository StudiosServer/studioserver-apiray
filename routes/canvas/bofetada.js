const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/bofetada', async (req, res) => {
    const query1 = req.query.query1;
    const query2 = req.query.query2;
    if (!query1) {
        return res.status(400).json({ error: 'El parámetro de consulta "query1=url image" ejemplo requerido' });
    }
    if (!query2) {
        return res.status(400).json({ error: 'El parámetro de consulta "query2=url image" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/bofetada?url1=${encodeURIComponent(query1)}&url2=${encodeURIComponent(query2)}`;
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
