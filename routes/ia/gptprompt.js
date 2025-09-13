const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada
router.get('/ia/gptprompt', async (req, res) => {
    const query = req.query.query;
    const prompt = req.query.prompt;
    if (!query) {
        return res.status(400).json({error: 'Falta un parametro "query" es requerido'})
    }
    if (!prompt) {
        return res.status(400).json({ error: 'El parámetro de consulta "prompt" es requerido' });
    }

    try {
        const apiURL = `https://delirius-apiofc.vercel.app/ia/gptprompt?text=${encodeURI(query)}&prompt=${encodeURIComponent(prompt)}`;
        const response = await axios.get(apiURL);

        res.json({
            creator: 'Studio Server',
            status: true,
            data: response.data.data,
            input: prompt,
        });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ status : false });
    }
});

module.exports = router;
