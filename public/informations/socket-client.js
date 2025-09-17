// Socket.IO Client para recibir datos del sistema
document.addEventListener('DOMContentLoaded', function() {
    // Conectar al servidor Socket.IO
    const socket = io();
    
    console.log('Conectando al servidor Socket.IO...');
    
    // Manejar conexión exitosa
    socket.on('connect', function() {
        console.log('Conectado al servidor Socket.IO:', socket.id);
    });
    
    // Manejar desconexión
    socket.on('disconnect', function() {
        console.log('Desconectado del servidor Socket.IO');
    });
    
    // Manejar errores de conexión
    socket.on('connect_error', function(error) {
        console.error('Error de conexión Socket.IO:', error);
    });
    
    // Escuchar datos del sistema enviados por socket
    socket.on('systemData', function(data) {
        console.log('Datos del sistema recibidos:', data);
        updateSystemData(data);
    });
    
    // Función para actualizar los elementos del DOM con los datos del sistema
    function updateSystemData(data) {
        try {
            // Actualizar plataforma
            const platformElement = document.getElementById('platform');
            if (platformElement && data.platform) {
                platformElement.textContent = data.platform;
            }
            
            // Actualizar CPU
            const cpuElement = document.getElementById('cpu');
            if (cpuElement && data.cpu) {
                cpuElement.textContent = data.cpu;
            }
            
            // Actualizar RAM
            const ramUseElement = document.getElementById('RAMuse');
            const ramTotalElement = document.getElementById('RAMtotal');
            if (ramUseElement && ramTotalElement && data.RAM) {
                ramUseElement.textContent = data.RAM.use || 'loading...';
                ramTotalElement.textContent = data.RAM.total || 'loading...';
            }
            
            // Actualizar runtime (uptime)
            const runtimeElement = document.getElementById('runtime');
            if (runtimeElement && data.uptime) {
                runtimeElement.textContent = data.uptime;
            }
            
            // Actualizar procesador
            const processorElement = document.getElementById('processor');
            if (processorElement && data.processor) {
                processorElement.textContent = data.processor;
            }
            
            // Actualizar región
            const regionElement = document.getElementById('region');
            if (regionElement && data.region) {
                regionElement.textContent = data.region;
            }
            
            // Actualizar requests (orders)
            const requestsElement = document.getElementById('rrspedi');
            if (requestsElement && data.orders !== undefined) {
                requestsElement.textContent = data.orders.toLocaleString();
            }
            
            // Actualizar fecha/hora actual
            const dateTimeElement = document.getElementById('currentDateTime');
            if (dateTimeElement && data.Server) {
                const serverTime = data.Server.dateTime || new Date().toISOString();
                const formattedTime = new Date(serverTime).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Asia/Tokyo'
                });
                dateTimeElement.textContent = `${formattedTime} (Tokyo)`;
            }
            
            // Actualizar contadores de visitantes si existen
            const visitorCountElement = document.getElementById('visitorCount');
            if (visitorCountElement) {
                // Este campo no viene en los datos del sistema, mantener valor actual
                if (visitorCountElement.textContent === 'Not available') {
                    visitorCountElement.textContent = 'Socket conectado';
                }
            }
            
            // Actualizar última visita si existe
            const lastVisitorTimeElement = document.getElementById('lastVisitorTime');
            if (lastVisitorTimeElement) {
                const now = new Date().toLocaleString('es-ES');
                lastVisitorTimeElement.textContent = `Actualizado: ${now}`;
            }
            
            console.log('DOM actualizado con datos del sistema');
        } catch (error) {
            console.error('Error actualizando DOM:', error);
        }
    }
    
    // Los datos del sistema se emiten automáticamente por socket cada 5 segundos
    // Ya no es necesario hacer peticiones HTTP a /system
});