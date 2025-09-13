const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/download/pinterest', async (req, res) => {
    const query = req.query.url;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "url1" es requerido'
        });
    }

    let aborted = false;
    req.on('abort', () => { aborted = true; });

    try {
        const response = await axios.get(query, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
        });

        if (aborted) return;

        const $ = cheerio.load(response.data);
        const firstJpg = $('img[src$=".jpg"]').first().attr('src');

        if (!firstJpg) {
            return res.status(404).json({
                creator: 'Studio Server',
                status: false,
                message: 'No se encontró ninguna imagen JPG en el HTML'
            });
        }

        const absoluteUrl = firstJpg.startsWith('http') ? firstJpg : new URL(firstJpg, query).href;
        const imageResponse = await axios.get(absoluteUrl, { responseType: 'arraybuffer' });
        const jpgBuffer = Buffer.from(imageResponse.data);
        const pngBuffer = await sharp(jpgBuffer).png().toBuffer();
        const filePath = path.join(__dirname, 'tempdata', 'pinterest.png');
        fs.writeFileSync(filePath, pngBuffer);

        res.sendFile(filePath, err => {
            if (err) {
                return res.status(500).json({
                    creator: 'Studio Server',
                    status: false,
                    message: 'Error al enviar la imagen convertida'
                });
            }

            fs.unlink(filePath, () => {});
        });

    } catch {
        res.status(500).json({
            creator: 'Studio Server',
            status: false,
            message: 'Error al procesar la solicitud'
        });
    }
});

module.exports = router;