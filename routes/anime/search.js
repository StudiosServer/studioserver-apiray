const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

// Ruta para realizar la búsqueda y extraer los datos
router.get('/anime/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'El parámetro de consulta "query" es requerido' });
    }

    try {
        const searchURL = `https://ww3.animeonline.ninja/?s=${encodeURIComponent(query)}`;
        
        // Lanzar el navegador con puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(searchURL, { waitUntil: 'networkidle2' });

        // Esperar 2 segundos para asegurar que la página esté completamente cargada
        await page.waitForTimeout(2000);

        // Extraer el HTML de la página
        const html = await page.content();
        await browser.close();

        const dom = new JSDOM(html);
        const document = dom.window.document;

        const resultItems = document.querySelectorAll('.result-item');
        const data = Array.from(resultItems).map(item => {
            const titleElement = item.querySelector('.title a');
            const ratingElement = item.querySelector('.rating');
            const yearElement = item.querySelector('.year');
            const descriptionElement = item.querySelector('.contenido p');
            const imageElement = item.querySelector('.thumbnail img');

            return {
                title: titleElement ? titleElement.textContent.trim() : 'Sin título',
                url: titleElement ? titleElement.href : 'Sin URL',
                rating: ratingElement ? ratingElement.textContent.trim() : 'Sin calificación',
                year: yearElement ? yearElement.textContent.trim() : 'Sin año',
                description: descriptionElement ? descriptionElement.textContent.trim() : 'Sin descripción',
                image: imageElement ? imageElement.src : 'Sin imagen'
            };
        });

        if (data.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados' });
        }

        res.json({
            creator: 'Studio Server',
            status: true,
            data: data
        });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ error: 'Error al realizar la búsqueda en la página web' });
    }
});

module.exports = router;
