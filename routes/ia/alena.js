const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta de búsqueda personalizada con Alena AI
router.get('/ia/alena', async (req, res) => {
    const query = req.query.query;
    
    if (!query) {
        return res.status(400).json({ 
            error: 'El parámetro de consulta "query" es requerido' 
        });
    }

    try {
        const apiURL = `https://www.abella.icu/alenaai?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiURL);

        if (response.data?.data?.answer) {
            res.json({
                creator: 'Studio Server',
                status: true,
                answer: response.data.data.answer
            });
        } else {
            res.json({
                creator: 'Studio Server',
                status: false,
                message: 'No se encontró una respuesta'
            });
        }

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        res.status(500).json({ 
            status: false,
            message: 'Error en la solicitud a Alena AI'
        });
    }
});

module.exports = router;