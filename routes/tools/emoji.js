const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/tools/emoji', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=😂" ejemplo' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/emoji?text=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        // Respondemos primero al cliente
        res.json({
            creator: 'Studio Server',
            status: true,
            host: response.data.host,
            data: response.data.data
        });

        // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
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