const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada
router.get('/search/tiktok', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        // Filtra y simplifica la respuesta creando un objeto con los títulos como claves
        const dataObject = response.data.meta.reduce((acc, item) => {
            acc[item.title] = {
                id: item.id,
                info: {
                    title: item.title,
                    id: item.author.id,
                    username: item.author.username,
                    nickname: item.author.nickname,
                    avatar: item.author.avatar,
                    region: item.region,
                },
                media: {
                    play: item.play,
                    duration: item.duration,
                    comments: item.coment,
                    share: item.share,
                    like: item.like,
                    download: item.download,
                    publish: item.publish,
                },
                video: {
                    hd: item.hd,
                },
                music: {
                    id: item.music.id,
                    title: item.music.title,
                    author: item.music.author,
                    url: item.music.play,
                }
            };
            return acc;
        }, {});

        res.json({
            creator: 'Studio Server',
            status: true,
            data: dataObject
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
