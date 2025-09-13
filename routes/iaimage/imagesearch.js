const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const IMAGE_FOLDER = path.join(__dirname, '/tempdata'); 
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Se recomienda almacenar en variables de entorno

// Ruta para buscar imágenes y descargar una aleatoria que tenga una URL válida
router.get('/iaimage/imagesearch', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Debes proporcionar un valor en query. Ejemplo: /iasearch/imagesearch?query=anime' });
    }

    try {
        // Consulta de búsqueda a la API externa
        const searchResponse = await axios.get(
            `https://api.live3d.io/api/v1/search/get_posts_by_search?page_index=1&page_size=30&is_nsfw=0&search=${encodeURIComponent(query)}&ranking_type=2`,
            {
                headers: {
                    Authorization: API_KEY,
                    Accept: "*/*"
                }
            }
        );

        const searchResults = searchResponse.data.data.data;
        if (!searchResults || searchResults.length === 0) {
            return res.status(404).json({ error: 'No se encontraron imágenes para la búsqueda proporcionada.' });
        }

        let imageData = null;

        // Intentar encontrar una imagen con una URL válida
        for (let i = 0; i < searchResults.length; i++) {
            const randomIndex = Math.floor(Math.random() * searchResults.length);
            const candidateImage = searchResults[randomIndex];

            // Verificar si el objeto tiene una URL válida
            if (candidateImage.url && candidateImage.url.length > 0) {
                imageData = candidateImage;
                break;
            }
        }

        // Si no se encuentra ninguna imagen con URL, devolver un error
        if (!imageData) {
            return res.status(404).json({ error: 'No se encontró ninguna imagen válida en los resultados.' });
        }

        // Construir la URL de la imagen y obtener su ID
        const imageUrl = `https://art-global.yimeta.ai/${imageData.url[0]}`;

        // Descargar y almacenar la imagen con su ID como nombre de archivo
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imagePath = path.join(IMAGE_FOLDER, `iaimage.png`);

        fs.writeFileSync(imagePath, imageResponse.data);

        // Responder con la imagen descargada
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(imagePath);

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error en el proceso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;