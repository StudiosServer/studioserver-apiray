const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para obtener los datos de TikTok
router.get('/canvas/balcard', async (req, res) => {
    const query = req.query.query;
    const background = req.query.background;
    const name = req.query.name;
    const discriminator = req.query.discriminator;
    const money = req.query.money;
    const xp = req.query.xp;
    const level = req.query.level;
    if (!query) {
        return res.status(400).json({ message: 'El parámetro de consulta "query=url de imagen" ejemplo requerido' });
    }
    if (!background) {
        return res.status(400).json({ message: 'El parámetro de consulta "background=url de imagen 2" ejemplo requerido' });
    }
    if (!name) {
        return res.status(400).json({ message: 'El parámetro de consulta "name=liz ilami" ejemplo requerido' });
    }
    if (!discriminator) {
        return res.status(400).json({ message: 'El parámetro de consulta "discriminator=345876" ejemplo requerido' });
    }
    if (!money) {
        return res.status(400).json({ message: 'El parámetro de consulta "money=9999999" ejemplo requerido' });
    }
    if (!xp) {
        return res.status(400).json({ message: 'El parámetro de consulta "xp=879870987999" ejemplo requerido' });
    }
    
    if (!level) {
        return res.status(400).json({ message: 'El parámetro de consulta "level=768658" ejemplo requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/canvas/balcard?url=${encodeURIComponent(query)}&background=${encodeURIComponent(background)}&username=${encodeURIComponent(name)}&discriminator=${encodeURIComponent(discriminator)}&money=${encodeURIComponent(money)}&xp=${encodeURIComponent(xp)}&level=${encodeURIComponent(level)}`;
        const response = await axios.get(apiURL, { responseType: 'arraybuffer' });

        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status: false });
    }
});

module.exports = router;
