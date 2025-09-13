const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const router = express.Router();

// Ruta que recibe solicitudes en GET y procesa la imagen mediante un POST a la API externa
router.get('/tools/iaimage', async (req, res) => {
    const query = req.query.query; // Recibir la entrada del usuario en GET

    if (!query) {
        return res.status(400).json({ error: 'Se requiere un texto de entrada (query).' });
    }

    try {
        const apiUrl = 'https://aicreate.com/wp-admin/admin-ajax.php';

        // Crear el formulario de datos para la petición POST
        const formData = new FormData();
        formData.append('action', 'text_to_image_handle');
        formData.append('caption', query);
        formData.append('negative_prompt', 'ugly, deformed, disfigured, nsfw, low res, blurred');
        formData.append('model_version', 'flux');
        formData.append('size', '1024x1024');

        // Enviar la petición POST a la API externa
        const apiResponse = await axios.post(apiUrl, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        // Extraer el primer enlace de imagen de la respuesta
        const htmlResponse = apiResponse.data.html;
        const match = htmlResponse.match(/https:\/\/aicdn\.picsart\.com\/[a-zA-Z0-9-]+\.jpg/);

        if (!match) {
            return res.status(500).json({ error: 'No se encontró ninguna imagen en la respuesta de la API.' });
        }

        const firstImageUrl = match[0]; // Extraemos el primer enlace de imagen
        const imagePath = path.join(__dirname, 'tempdata', 'iaimage.png');

        // Descargar y guardar la imagen en tempdata/iaimage.png
        const imageResponse = await axios.get(firstImageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(imagePath, imageResponse.data);

        // Enviar la imagen guardada como respuesta
        res.sendFile(imagePath);

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al generar la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;