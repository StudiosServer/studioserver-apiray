const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const IMAGE_FOLDER = path.join(__dirname, '/tempdata');

// Ruta para obtener imagen generada por la API siputzx
router.get('/iaimage/imagevret', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Debes proporcionar un valor en query. Ejemplo: /iaimage/imagevret?query=anime' });
    }

    try {
        // Construir la URL de la API con el prompt
        const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(query)}`;

        // Solicitar la imagen como arraybuffer
        const imageResponse = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        // Validar tipo de contenido
        const contentType = imageResponse.headers['content-type'] || 'image/png';
        const imagePath = path.join(IMAGE_FOLDER, `fluximage.png`);

        // Guardar la imagen localmente
        fs.writeFileSync(imagePath, imageResponse.data);

        // Enviar la imagen como respuesta
        res.setHeader('Content-Type', contentType);
        res.sendFile(imagePath);

        // Validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL).catch(() => {});
        });

    } catch (error) {
        res.status(500).json({ error: 'falied' });
    }
});

module.exports = router;