const express = require('express');
const axios = require('axios');
const router = express.Router();

// Función para validar URL
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

// Ruta de descarga personalizada para Spotify
router.get('/download/spotify', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    if (!isValidUrl(query)) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'La URL proporcionada no es válida'
        });
    }

    try {
        // Petición GET a la nueva API
        const apiURL = `https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        if (!response.data || !response.data.data) {
            return res.status(404).json({
                creator: 'Studio Server',
                status: false,
                message: 'No se encontró la información de la pista.'
            });
        }

        const trackData = response.data.data;

        // Crear el JSON final con el formato solicitado
        const finalResponse = {
            creator: 'Studio Server',
            status: true,
            data: {
                title: trackData.title,
                type: trackData.type,
                artist: trackData.artis, // Corrigiendo "artis" a "artist"
                duration: trackData.durasi,
                image: trackData.image,
                download: trackData.download,
                line: trackData.status
            }
        };

        res.json(finalResponse);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al obtener la pista de Spotify:', error.message);
        res.status(500).json({
            creator: 'Studio Server',
            status: false,
            message: 'Error en el sistema'
        });
    }
});

module.exports = router;