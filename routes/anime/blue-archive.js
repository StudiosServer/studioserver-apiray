const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const router = express.Router();

router.get('/anime/blue-archive', async (req, res) => {
    // URLs de las imágenes para usar (fallback)
    const imageUrls = [
        'https://izumiiiiiiii.dpdns.org/random/bluearchive',
        'https://rynekoo-api.vercel.app/random/blue-archive',
        'https://api.nekolabs.my.id/random/blue-archive',
        'https://rynekoo-api.up.railway.app/random/blue-archive',
        'https://rynekoo-api.vercel.app/random/blue-archive',
        'https://rynekoo-api.hf.space/random/blue-archive',
        'https://api.siputzx.my.id/api/r/blue-archive'
    ];

    let lastError = null;

    for (let i = 0; i < imageUrls.length; i++) {
        try {
            const imageUrl = imageUrls[i];
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

            // Convertir de JPG a PNG usando Sharp
            const pngBuffer = await sharp(response.data)
                .png()
                .toBuffer();

            // Guardar la imagen convertida en el directorio especificado
            const imagePath = path.join(__dirname, 'tempdata/blue-archive.png');
            fs.writeFileSync(imagePath, pngBuffer);

            // Enviar la imagen como respuesta
            res.sendFile(imagePath);
            
            // Luego ejecutamos la validación secundaria en segundo plano
            setImmediate(() => {
                const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
                axios.get(trackingURL)
            });
            
            return; // Salir si la respuesta fue exitosa
        } catch (error) {
            lastError = error;
            // Continuar con la siguiente URL si hay un error
        }
    }

    // Si llegamos aquí, todas las URLs fallaron
    res.status(500).json({ status: false });
});

module.exports = router;