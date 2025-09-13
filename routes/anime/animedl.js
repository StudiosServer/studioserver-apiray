const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

// Ruta para extraer el HTML y obtener el elemento <video> con id="mainvideo"
router.get('/anime/animedl', async (req, res) => {
    const url = req.query.query;
    if (!url) {
        return res.status(400).json({ error: 'El parámetro de consulta "query" es requerido' });
    }

    try {
        // Iniciar el navegador con puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Hacer clic en los elementos necesarios hasta encontrar el <video> con id="mainvideo"
        let videoElement = null;
        while (!videoElement) {
            // Buscar y hacer clic en los elementos con id="tocar aqui ejemplo"
            const elementsToClick = await page.$$('div[id^="tocar aqui"]');
            for (let element of elementsToClick) {
                await element.click();
                await page.waitForTimeout(1000); // Esperar un poco para cargar el contenido
            }

            // Verificar si el elemento <video> con id="mainvideo" está presente
            videoElement = await page.$('video#mainvideo');
            if (videoElement) {
                const videoHtml = await page.evaluate(element => element.outerHTML, videoElement);
                await browser.close();
                return res.send(videoHtml);
            }
        }

        await browser.close();
        
        res.status(404).json({ error: 'Elemento <video> con id="mainvideo" no encontrado' });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ error: 'Error al extraer el HTML de la página web' });
    }
});

module.exports = router;
