const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada
router.get('/search/genius', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/genius?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        // Extrae los datos de las canciones y crea el formato requerido
        const songData = response.data.reduce((acc, song) => {
            acc[song.artist.name] = {
                fullTitle: song.fullTitle,
                url: song.url,
                thumbnail: song.thumbnail,
                image: song.image,
                id: song.id,
                endpoint: song.endpoint,
                instrumental: song.instrumental,
                publish: song.publish,
                artist: {
                    name: song.artist.name,
                    url: song.artist.url,
                    avatar: song.artist.avatar,
                    verified: song.artist.verified
                }
            };
            return acc;
        }, {});

        res.json({
            creator: 'Studio Server',
            status: true,
            data: songData
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
