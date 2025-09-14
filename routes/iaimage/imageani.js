const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const IMAGE_PATH = path.join(__dirname, '../tempdata/iaimage.png');

// Ruta para generar imagen IA basada en un prompt recibido en query
router.get('/iaimage/imageani', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Debes proporcionar un valor en query. Ejemplo: /iaimage/iaimage?query=un paisaje futurista' });
    }

    try {
        // Hacer petición directa a la nueva API que devuelve la imagen
        const apiUrl = `https://api.siputzx.my.id/api/ai/magicstudio?prompt=${encodeURIComponent(query)}`;
        
        const imageResponse = await axios.get(apiUrl, { 
            responseType: 'arraybuffer',
            timeout: 60000 // 60 segundos de timeout
        });

        // Verificar si la respuesta contiene una imagen válida
        if (!imageResponse.data || imageResponse.data.length === 0) {
            return res.status(500).json({ error: 'La API no devolvió una imagen válida' });
        }

        // Verificar el tipo de contenido para asegurar que es una imagen
        const contentType = imageResponse.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
            return res.status(500).json({ error: 'La respuesta no es una imagen válida' });
        }

        // Guardar la imagen recibida
        fs.writeFileSync(IMAGE_PATH, imageResponse.data);

        // Responder con la imagen guardada
        res.setHeader('Content-Type', contentType);
        res.sendFile(IMAGE_PATH);
        
        // Ejecutar la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL).catch(() => {}); // Silenciar errores del tracking
        });

    } catch (error) {
        console.error('Error en el proceso:', error);
        
        // Si el error es de timeout o red, dar un mensaje más específico
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
            return res.status(500).json({ error: 'Tiempo de espera agotado. La API tardó demasiado en responder.' });
        }
        
        // Si el error es de la API (respuesta HTTP con error)
        if (error.response) {
            return res.status(500).json({ error: 'Error en la API externa: no se pudo generar la imagen' });
        }
        
        // Error genérico
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;