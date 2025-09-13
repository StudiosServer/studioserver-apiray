const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/tweet', async (req, res) => {
    const query = req.query.query;
    const name = req.query.name;
    const username = req.query.username;
    const comment = req.query.comment;
    const theme = req.query.theme;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query=url image" ejemplo requerido' });
    }

    if (!name) {
        return res.status(400).json({ error: 'El parámetro de consulta "name= shinoa" ejemplo requerido' });
    }
    if (!username) {
        return res.status(400).json({ error: 'El parámetro de consulta "username= shinoa" ejemplo requerido' });
    }
    if (!comment) {
        return res.status(400).json({ error: 'El parámetro de consulta "comment=i like account!!" ejemplo requerido' });
    }

    if (!theme) {
        return res.status(400).json({ error: 'El parámetro de consulta "theme=dark" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/tweet?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&comment=${encodeURIComponent(comment)}&image=${encodeURIComponent(query)}&theme=${encodeURIComponent(theme)}`;
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
