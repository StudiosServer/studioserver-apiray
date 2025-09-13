const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/friendship', async (req, res) => {
    const query1 = req.query.query1;
    const query2 = req.query.query2;
    const name1 = req.query.name1;
    const name2 = req.query.name2;
    const porcentage = req.query.porcentage;
    const text = req.query.text;
    if (!query1) {
        return res.status(400).json({ message: 'El parámetro de consulta "query1=url de imagen 1" ejemplo requerido' });
    }
    if (!query2) {
        return res.status(400).json({ message: 'El parámetro de consulta "query2=url de imagen 2" ejemplo requerido' });
    }
    if (!name1) {
        return res.status(400).json({ message: 'El parámetro de consulta "name1=nombre 1" ejemplo requerido' });
    }
    if (!name2) {
        return res.status(400).json({ message: 'El parámetro de consulta "name2=nombre 2" ejemplo requerido' });
    }
    if (!porcentage) {
        return res.status(400).json({ message: 'El parámetro de consulta "porcentage=porcentage" ejemplo requerido' });
    }
    if (!text) {
        return res.status(400).json({ message: 'El parámetro de consulta "text=texto" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/friendship?image1=${encodeURIComponent(query1)}&name1=${encodeURIComponent(name1)}&image2=${encodeURIComponent(query2)}&name2=${encodeURIComponent(name2)}&percentage=${encodeURIComponent(porcentage)}&text=${encodeURIComponent(text)}`;
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
