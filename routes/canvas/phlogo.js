const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para generar y descargar la imagen
router.get('/canvas/phlogo', async (req, res) => {
    const { query, text } = req.query;

    if (!query || !text) {
        return res.status(400).json({ 
            error: 'Los parámetros "query" y "text" son requeridos. Ejemplo: /canvas/phlogo?text1=Texto1&text2=Texto2' 
        });
    }

    try {
        // URL de la API de generación de imágenes
        const apiUrl = `https://apikey.sazxofficial.web.id/api/imagecreator/pornhub?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
        const response = await axios.get(apiUrl);

        // Validar respuesta de la API
        if (!response.data || !response.data.status || !response.data.result) {
            return res.status(500).json({ status: false, message: 'Error al obtener la imagen de la API' });
        }

        // Descargar la imagen desde la URL proporcionada en "result"
        const imageUrl = response.data.result;
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Definir ruta de almacenamiento
        const imagePath = path.join(__dirname, 'tempdata', 'pornhubcanvas.png');

        // Guardar la imagen en el servidor
        fs.writeFileSync(imagePath, imageResponse.data);

        // Responder con la imagen guardada
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(imagePath);

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
});

module.exports = router;