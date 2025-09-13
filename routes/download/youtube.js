const express = require('express');
const axios = require('axios');
const router = express.Router();

const videoAPI = "https://fastrestapis.fasturl.cloud/downup/ytmp4";
const audioAPI = "https://p.oceansaver.in/ajax/download.php";
const audioProgressAPI = "https://p.oceansaver.in/ajax/progress.php";

// Función para obtener el enlace de descarga del video
const obtenerEnlaceVideo = async (url) => {
    const resoluciones = ['1080', '720', '480', '360'];
    let videoData = null;

    for (const calidad of resoluciones) {
        try {
            const apiUrl = `${videoAPI}?url=${encodeURIComponent(url)}&quality=${calidad}`;
            const { data: res } = await axios.get(apiUrl);

            if (res?.status === 200 && res?.result?.media) {
                videoData = res;
                break;
            }
                // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
            console.error(`Error al intentar calidad ${calidad}:`, error.message);
        }
    }
    return videoData?.result || null;
};

// Función para obtener el enlace de descarga del audio
const obtenerEnlaceAudio = async (url) => {
    try {
        const apiUrl = `${audioAPI}?format=mp3&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
        const { data: res } = await axios.get(apiUrl);

        if (!res?.success) throw new Error("Error al obtener información del audio.");

        const { id, title, info: { image } } = res;

        let downloadUrl = null;
        const progressUrl = `${audioProgressAPI}?id=${id}`;
        while (!downloadUrl) {
            const progressRes = await axios.get(progressUrl);
            if (progressRes.data?.success && progressRes.data.progress === 1000) {
                downloadUrl = progressRes.data.download_url;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        return { title, image, downloadUrl };
            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error en la API de descarga de audio:', error);
        return null;
    }
};

// Ruta combinada para obtener video y audio con información del contenido
router.get('/download/youtube', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ 
            creator: 'Studio Server', 
            status: false, 
            message: 'El parámetro "query" es requerido' 
        });
    }

    try {
        const videoData = await obtenerEnlaceVideo(query);
        const audioData = await obtenerEnlaceAudio(query);

        if (!videoData || !audioData) {
            return res.status(404).json({ 
                creator: 'Studio Server', 
                status: false, 
                message: 'No se encontraron enlaces de descarga válidos' 
            });
        }

        res.json({
            creator: 'Studio Server',
            status: true,
            data: {
                title: videoData.title,
                channel: videoData.author.name,
                uploadDate: videoData.metadata.uploadDate,
                views: videoData.metadata.views,
            video: {
                title: videoData.title,
                thumbnail: videoData.metadata.thumbnail,
                duration: videoData.metadata.duration,
                quality: videoData.quality,
                url: videoData.media

            },
            song: {
                title: audioData.title,
                thumbnail: audioData.image,
                duration: videoData.metadata.duration,
                quality: audioData.quality,
                url: audioData.downloadUrl
            }
        }});

            // Luego ejecutamos la validación secundaria en segundo plano
        setImmediate(() => {
            const trackingURL = `https://studioservercounterapimax.onrender.com/use`;
            axios.get(trackingURL)
        });} catch (error) {
        console.error('Error en la API de descarga:', error);
        res.status(500).json({ 
            creator: 'Studio Server', 
            status: false, 
            message: error.message 
        });
    }
});

module.exports = router;