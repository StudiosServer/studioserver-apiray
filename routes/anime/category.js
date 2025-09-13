const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const validCategories = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
];

router.get('/anime/category', async (req, res) => {
    const category = req.query.query;

    if (!category) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'No hay nada, el campo de texto "query" está vacío, use uno de la lista de categorías para usar la API',
            categories: validCategories
        });
    }

    if (!validCategories.includes(category)) {
        return res.status(400).json({
            status: false,
            message: `Esto no está disponible, use uno de la lista de categorías para usar la API`,
            categories: validCategories
        });
    }

    try {
        // URL de la API que proporciona el JSON con el enlace de la imagen
        const apiUrl = `https://api.waifu.pics/sfw/${encodeURIComponent(category)}`;
        const apiResponse = await axios.get(apiUrl);
        const imageUrl = apiResponse.data.url; // Ajusta esto según la estructura de tu JSON

        // Descargar la imagen desde el enlace proporcionado
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Guardar la imagen en el directorio especificado
        const imagePath = path.join(__dirname, 'tempdata/category.png');
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
