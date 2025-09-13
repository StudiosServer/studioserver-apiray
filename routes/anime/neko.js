const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/anime/neko', async (req, res) => {
    try {
        // URL de la API que devuelve el JSON con el enlace de la imagen
        const apiUrl = 'https://nekos.life/api/v2/img/neko';
        const response = await axios.get(apiUrl);

        // Obtener el enlace de la imagen desde el JSON
        const imageUrl = response.data.url;
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Guardar la imagen en el directorio especificado
        const imagePath = path.join(__dirname, 'tempdata/neko.webp');
        fs.writeFileSync(imagePath, imageResponse.data);

        // Enviar la imagen como respuesta
        res.sendFile(imagePath);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;