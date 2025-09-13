const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const IMAGE_PATH = path.join(__dirname, '../tempdata/iaimage.png');

// Ruta para generar imagen IA basada en un prompt recibido en query
router.get('/iaimage/iaimage', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Debes proporcionar un valor en query. Ejemplo: /iaimae/iaimage?prompt=un paisaje futurista' });
    }

    try {
        // Primera petición: Generar imagen con la API externa
        const generateResponse = await axios.post(
            'https://api.live3d.io/api/v1/generation/generate',
            {
                model_id: 135,
                width: 512,
                height: 768,
                prompt: query,
                request_data: {
                    loras: [],
                    resolution: "1",
                    image_number: 1,
                    negative_prompt: "(worst quality, low quality:1.4), (greyscale, monochrome:1.1)",
                    sampling: { step: 25, method: "DPM++ 2M Karras" },
                    cfg: { scale: 7, seed: -1 },
                    high_priority: false,
                    control_weight: 1
                },
                consume_points: 10,
                img_url: "",
                type: 1,
                divide_ratio: "",
                matrix_mode: "",
                gen_type: "text_to_image"
            },
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg0NDk2NjEsInN1YiI6Imdvb2dsZSAzNDI4OTUxIHNlcnZpZG8xMDM0QGdtYWlsLmNvbSJ9.6zMR47QJNe2DB78SHK2YIG55a9WwAulEryYnxOGnT9U",
                    Accept: "*/*"
                }
            }
        );

        const artId = generateResponse.data.data.id;

        // Esperar la generación de la imagen
        let imageUrl = null;
        while (!imageUrl) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos

            const checkResponse = await axios.get(
                `https://api.live3d.io/api/v1/generation/check_generate_state?ai_art_id=${artId}`,
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg0NDk2NjEsInN1YiI6Imdvb2dsZSAzNDI4OTUxIHNlcnZpZG8xMDM0QGdtYWlsLmNvbSJ9.6zMR47QJNe2DB78SHK2YIG55a9WwAulEryYnxOGnT9U",
                        Accept: "*/*"
                    }
                }
            );

            if (checkResponse.data.data.status === 1) {
                imageUrl = checkResponse.data.data.url[0];
            }
        }

        // Construir la URL final de la imagen
        const finalImageUrl = `https://art-global.yimeta.ai/${imageUrl}`;

        // Descargar la imagen y guardarla en /tempdata/iaimage.png
        const imageResponse = await axios.get(finalImageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(IMAGE_PATH, imageResponse.data);

        // Responder con la imagen guardada
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(IMAGE_PATH);
        
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