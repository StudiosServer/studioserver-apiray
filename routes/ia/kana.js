const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/ia/kana', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Te falta el de query=tu texto' });
    }

    try {
        const response = await axios.post('https://shinoa.us.kg/api/gpt/kana', {
            text: query,
            prompt: "trabajas con studio server, tu nombre es kana"
        }, {
            headers: {
                'accept': '*/*',
                'api_key': 'free',
                'Content-Type': 'application/json'
            }
        });

        res.json({
            creator: 'Studio Server',
            status: true,
            data: response.data.data.result,
        });
        
        // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            try {
                const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
                axios.get(trackingURL).catch(() => {});
            } catch (e) {}
        });
    } catch (error) {
        console.error('Error en Kana API:', error.message);
        res.status(500).json({ 
            creator: 'Studio Server',
            status: false,
            message: 'Servicio de IA temporalmente no disponible'
        });
    }
});

module.exports = router;