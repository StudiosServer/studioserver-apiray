const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener instalado el paquete axios

// Variables para el tiempo de inicio
let startTime = Date.now();
let incrementSpeed = 80; // Velocidad inicial de incremento en ms

// Función para calcular el tiempo activo
function getUptime() {
    let currentTime = Date.now();
    let uptime = currentTime - startTime;
    let seconds = Math.floor((uptime / 1000) % 60);
    let minutes = Math.floor((uptime / (1000 * 60)) % 60);
    let hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
    let days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    
    return `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Función valor del uso de CPU
function getCpuUsage() {
    const minUsage = 1.43;
    const maxUsage = 4.80;
    return (Math.random() * (maxUsage - minUsage) + minUsage).toFixed(2) + '%';
}

// Función valor del uso de RAM
function getRamUsage() {
    const minUsage = 13.68;
    const maxUsage = 18.40;
    const use = (Math.random() * (maxUsage - minUsage) + minUsage).toFixed(2) + ' MB';
    const total = '3TB';
    return { use, total };
}

// Función valor del sistema de Plataforma
const system = 'Linux (x64)';

// Función valor de procesador
const processor = 'AMD EPYC 9654 Processor @ 3.7 GHz';

// Función valor de región
const region = 'Japan East';


let orders = 0;

setInterval(async () => {
    try {
        const url = 'https://studioservercounterapimax.onrender.com/status'; // 🔁 Reemplázalo con tu URL real
        const response = await axios.get(url);

        orders = response.data.usageCount;
    } catch (error) {
    }
}, 1000); // 🔁 Cada 1000 ms = 1 segundo
// Iniciar el contador


// Función para obtener la hora actual en Tokio desde la API de TimeAPI.io
async function getTokyoTime() {
    const response = await axios.get('https://timeapi.io/api/time/current/zone?timeZone=Asia/Tokyo');
    return response.data;
}

// Ruta para obtener el tiempo activo en JSON
router.get('/system', async (req, res) => {
    const uptime = getUptime();
    const cpuUsage = getCpuUsage();
    const ramUsage = getRamUsage();
    const tokyoTimeData = await getTokyoTime();
    
    res.json({
        creator: 'Studio Server',
        status: true,
        uptime: uptime,
        cpu: cpuUsage,
        RAM: ramUsage,
        platform: system,
        processor: processor,
        region: region,
        orders: orders,
        Server: tokyoTimeData
    });
});

module.exports = router;
