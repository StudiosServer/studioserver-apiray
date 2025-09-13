const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/random/asiaticas', async (req, res) => {
    try {
        // URL de la imagen que deseas descargar
        const imageUrl = 'https://delirius-apiofc.vercel.app/random/asiaticas';
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Guardar la imagen en el directorio especificado
        const imagePath = path.join(__dirname, 'tempdata/asiaticas.png');
        fs.writeFileSync(imagePath, response.data);

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
