const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para generar imágenes con Deep Image Generator
router.get('/tools/deepimage', async (req, res) => {
    const { query, style } = req.query;

    if (!query) {
        return res.status(400).json({
            creator: "Studio Server",
            status: false,
            message: 'Falta el parámetro query. Ejemplo: /tools/deepimage?query=City at night&style=Cyberpunk'
        });
    }

    const prompt = query;
    const imageStyle = style ? style.toLowerCase() : 'realistic';
    const deviceId = `dev-${Math.floor(Math.random() * 1000000)}`;

    try {
        // Petición a la API de generación de imágenes
        const response = await axios.post('https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev', {
            prompt: `${prompt} -style ${imageStyle}`,
            size: "1024x1024",
            device_id: deviceId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://deepimg.ai',
                'Referer': 'https://deepimg.ai/'
            }
        });

        // Validar respuesta
        if (!response.data?.data?.images?.length) {
            return res.status(500).json({
                creator: "Studio Server",
                status: false,
                message: 'Error al generar la imagen'
            });
        }

        // Obtener URL de la imagen generada
        const imageUrl = response.data.data.images[0].url;
        const imagePath = path.join(__dirname, 'tempdata', 'deepimage.png');

        // Descargar la imagen y guardarla en el servidor
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(imagePath, imageResponse.data);

        // Servir la imagen guardada
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(imagePath);

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({
            creator: "Studio Server",
            status: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;