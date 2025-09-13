const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos del país
router.get('/tools/country', async (req, res) => {
    const phoneNumber = req.query.query;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'El parámetro de consulta "query" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/tools/country?text=${encodeURIComponent(phoneNumber)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            data: response.data.result
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
