const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const router = express.Router();

router.get('/anime/blue-archive', async (req, res) => {
    try {
        // URL de la imagen que deseas descargar
        const imageUrl = 'https://izumiiiiiiii.dpdns.org/random/bluearchive';
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
    } catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;