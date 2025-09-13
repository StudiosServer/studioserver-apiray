const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para convertir imagen a boceto usando una URL sin guardar la imagen
router.get('/tools/tosketch', async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Debes proporcionar una URL de imagen. Ejemplo: /canvas/tosketch?imageUrl=https://example.com/image.png' });
    }

    try {
        // Procesar la imagen con la API de conversión a boceto
        const sketchUrl = `https://fastrestapis.fasturl.cloud/imgedit/tosketch?imageUrl=${encodeURIComponent(imageUrl)}&style=Pencil%20Sketch`;
        const sketchResponse = await axios.get(sketchUrl, { responseType: 'arraybuffer' });

        // Responder con la imagen sin guardarla
        res.setHeader('Content-Type', 'image/png');
        res.send(sketchResponse.data);

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