const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/anime/mori_calliope', async (req, res) => {
    try {
        // URL de la API que devuelve el JSON
        const apiUrl = 'https://delirius-apiofc.vercel.app/anime/mori_calliope';
        const apiResponse = await axios.get(apiUrl);

        // Extraer la URL de la imagen del JSON
        const imageUrl = apiResponse.data.data.image;
        
        // Descargar la imagen
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Guardar la imagen en el directorio especificado
        const imagePath = path.join(__dirname, 'tempdata/moricalliope.png');
        fs.writeFileSync(imagePath, imageResponse.data);

        // Enviar la imagen como respuesta
        res.sendFile(imagePath);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status : false });
    }
});

module.exports = router;
