const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener instalado el paquete axios

let io; // Variable para almacenar la instancia de Socket.IO

// Función para configurar la instancia de Socket.IO
function setSocketIO(socketIO) {
    io = socketIO;
}

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
    try {
        const response = await axios.get('https://timeapi.io/api/time/current/zone?timeZone=Asia/Tokyo');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo hora de Tokyo:', error.message);
        // Devolver datos locales como fallback
        return {
            dateTime: new Date().toISOString(),
            timeZone: 'Asia/Tokyo',
            fallback: true
        };
    }
}

// Función para obtener los datos del sistema
async function getSystemData() {
    const uptime = getUptime();
    const cpuUsage = getCpuUsage();
    const ramUsage = getRamUsage();
    const tokyoTimeData = await getTokyoTime();
    
    return {
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
    };
}

// La ruta /system ha sido eliminada - ahora solo se usan sockets

// Función para emitir datos del sistema periódicamente por socket
function startSystemDataEmission() {
    if (!io) {
        console.log('Socket.IO no está configurado para emitir datos del sistema');
        return;
    }
    
    setInterval(async () => {
        try {
            const systemData = await getSystemData();
            io.emit('systemData', systemData);
        } catch (error) {
            console.error('Error emitiendo datos del sistema:', error);
        }
    }, 50); // Emitir cada 1 segundo
}

module.exports = { router, setSocketIO, startSystemDataEmission, getSystemData };