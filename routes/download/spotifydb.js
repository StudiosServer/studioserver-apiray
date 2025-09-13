const express = require('express');
const router = express.Router();

// Función para validar URL
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

// Ruta de descarga personalizada para Pastebin
router.get('/download/spotifydb', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            message: 'El parámetro de consulta "query" es requerido'
        });
    }

    try {
        // Crear la URL de redirección
        const redirectUrl = `https://files.musicdown.co${query}`;

        // Redirigir a la URL creada
        res.redirect(redirectUrl);
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error al crear la redirección:', error.message);
        res.status(500).json({
            creator: 'Studio Server',
            status: false,
            message: 'Error interno del servidor, por favor intente más tarde'
        });
    }
});

module.exports = router;
