const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const data = require('../../data/data.js'); // Importar el contador y validación de API key
const config = require('../../config'); // Importar configuración para la API de YouTube

async function searchYouTube(query) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${config.youtube_api_key}`);
    const data = await response.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        type: 'video',
        videoId: item.id.videoId,
        url: `https://youtu.be/${item.id.videoId}`,
        description: item.snippet.description,
        image: item.snippet.thumbnails.high.url,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        author: {
            name: item.snippet.channelTitle,
            url: `https://www.youtube.com/channel/${item.snippet.channelId}`
        }
    }));
}

router.get('/search/youtube', async (req, res) => {
    const query = req.query.query;

    try {
        const results = await searchYouTube(query);
        const usageCount = data.incrementCounter(); // Incrementar el contador

        // Crear un objeto con los títulos como claves
        const resultsObject = results.reduce((acc, item) => {
            acc[item.title] = {
                type: item.type,
                videoId: item.videoId,
                url: item.url,
                title: item.title,
                description: item.description,
                image: item.image,
                thumbnail: item.thumbnail,
                publishedAt: item.publishedAt,
                author: item.author
            };
            return acc;
        }, {});

        res.json({
            creator: 'Studio Server',
            status: true,
            usageCount, // Incluir el contador en la respuesta
            data: resultsObject
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
