const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para convertir una imagen a estilo Ghibli usando una URL
router.get('/tools/toghibli', async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Debes proporcionar una URL de imagen. Ejemplo: /tools/toghibli?imageUrl=https://example.com/image.png' });
    }

    try {
        // Procesar la imagen con la API de conversión a estilo Ghibli
        const ghibliUrl = `https://fgsi1-restapi.hf.space/api/ai/toGhibli?url=${encodeURIComponent(imageUrl)}`;
        const ghibliResponse = await axios.get(ghibliUrl, { responseType: 'arraybuffer' });

        // Responder directamente con la imagen procesada sin guardarla
        res.setHeader('Content-Type', 'image/png');
        res.send(ghibliResponse.data);

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;