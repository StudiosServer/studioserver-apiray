const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de solicitud POST para gpt3.5-Turbo
router.get('/ia/gpt', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El campo de texto "query" es requerido'
        });
    }

    try {
        const apiURL = 'https://shinoa.us.kg/api/gpt/gpt3.5-Turbo';
        const response = await axios.post(apiURL, { text: query }, {
            headers: {
                'accept': '*/*',
                'api_key': 'free',
                'Content-Type': 'application/json'
            }
        });

        const modifiedResponse = {
            creator: 'Studio Server',
            status: true,
            ia: 'gpt3.5-Turbo',
            data: response.data.data
        };

        res.json(modifiedResponse);
        
        // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            try {
                const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
                axios.get(trackingURL).catch(() => {});
            } catch (e) {}
        });
    } catch (error) {
        console.error('Error en GPT API:', error.message);
        res.status(500).json({
            creator: 'Studio Server',
            status: false,
            message: 'Servicio de IA temporalmente no disponible'
        });
    }
});

module.exports = router;