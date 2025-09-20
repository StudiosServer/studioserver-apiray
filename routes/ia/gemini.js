const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
const router = express.Router();
const config = require('../../config'); // Configuración para la API de IA de Gemini

async function queryGemini(query) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.gemini_api_key}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: query }]
            }]
        })
    });
    if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

router.post('/ia/gemini', async (req, res) => {
    const messaje = req.body.messaje;
    const prompt = req.body.prompt;
    
    // Validar que el campo 'messaje' esté presente
    if (!messaje || messaje.trim() === '') {
        return res.status(400).json({
            creator: 'Studio Server',
            status: false,
            error: 'El campo "messaje" es requerido y no puede estar vacío'
        });
    }
    
    // Combinar el prompt del sistema con el mensaje del usuario
    let finalQuery;
    if (prompt && prompt.trim() !== '') {
        finalQuery = `${prompt.trim()}

Ahora responde a la siguiente consulta respetando las reglas anteriores:
${messaje.trim()}`;
    } else {
        finalQuery = messaje.trim();
    }

    try {
        // Realiza la consulta a la API de Gemini
        const geminiResponse = await queryGemini(finalQuery);
        
        // Obtiene el texto de la respuesta de Gemini
        const geminiText = geminiResponse.candidates[0].content.parts[0].text;
        
        // Devuelve la respuesta con el texto de Gemini
        res.json({
            creator: 'Studio Server',
            status: true,
            data: geminiText
        });
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });
    } catch (error) {
        console.error('Error en Gemini API:', error.message);
        res.status(500).json({ 
            creator: 'Studio Server',
            status: false,
            error: 'Error interno del servidor al procesar la consulta'
        });
    }
});

module.exports = router;
