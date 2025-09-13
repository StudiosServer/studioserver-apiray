const express = require('express');
const axios = require('axios');
const router = express.Router();
const data = require('../../data/data'); // Importar el contador y validación de API key

router.get('/search/spotify', async (req, res) => {
    const query = req.query.query;

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(query)}&limit=20`;
        const response = await axios.get(apiURL);

        const usageCount = data.incrementCounter(); // Incrementar el contador

        // Formatear la respuesta según lo especificado
        const tracksObject = response.data.data.reduce((acc, track) => {
            const nametitle = `${track.title} - ${track.artist}`;
            acc[nametitle] = {
                id: track.id,
                title: track.title,
                artist: track.artist,
                album: track.album,
                duration: track.duration,
                popularity: track.popularity,
                publish: track.publish,
                url: track.url,
                image: track.image
            };
            return acc;
        }, {});

        res.json({
            creator: 'Studio Server',
            status: true,
            usageCount, // Incluir el contador en la respuesta
            data: tracksObject
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
