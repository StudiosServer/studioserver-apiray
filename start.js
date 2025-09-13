#!/usr/bin/env node
const { exec, spawn } = require('child_process');
const config = require('./config');

// Variables globales para procesos
let tunnelProcess = null;
let serverProcess = null;

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = colors.cyan) {
    console.log(`${color}[Studio Server]${colors.reset} ${message}`);
}

function error(message) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function success(message) {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

// Funciones del túnel Cloudflare
async function startTunnel() {
    if (!config.tunnel_token) {
        error('Token de túnel no configurado. Establece CLOUDFLARE_TUNNEL_TOKEN en las variables de entorno.');
        return false;
    }

    return new Promise((resolve) => {
        log('Iniciando túnel de Cloudflare...');
        tunnelProcess = spawn('cloudflared', ['tunnel', 'run', '--token', config.tunnel_token], {
            stdio: ['ignore', 'pipe', 'pipe']
        });

        tunnelProcess.stdout.on('data', (data) => {
            const output = data.toString();
            if (output.includes('Registered tunnel connection')) {
                success('Túnel de Cloudflare conectado exitosamente');
                resolve(true);
            }
            console.log(`${colors.blue}[TUNNEL]${colors.reset} ${output.trim()}`);
        });

        tunnelProcess.stderr.on('data', (data) => {
            console.log(`${colors.yellow}[TUNNEL]${colors.reset} ${data.toString().trim()}`);
        });

        tunnelProcess.on('close', (code) => {
            log(`Túnel cerrado con código: ${code}`);
            tunnelProcess = null;
        });

        tunnelProcess.on('error', (err) => {
            error(`Error al iniciar túnel: ${err.message}`);
            tunnelProcess = null;
            resolve(false);
        });

        // Timeout si no se conecta en 30 segundos
        setTimeout(() => {
            if (tunnelProcess && !tunnelProcess.killed) {
                resolve(true);
            }
        }, 30000);
    });
}

function stopTunnel() {
    if (tunnelProcess) {
        log('Deteniendo túnel de Cloudflare...');
        tunnelProcess.kill('SIGTERM');
        tunnelProcess = null;
        success('Túnel detenido');
        return true;
    } else {
        log('El túnel no está ejecutándose');
        return false;
    }
}

function listTunnels() {
    log('Listando túneles activos...');
    exec('cloudflared tunnel list', (error, stdout, stderr) => {
        if (error) {
            error(`Error al listar túneles: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${colors.yellow}[TUNNEL]${colors.reset} ${stderr}`);
        }
        console.log(`${colors.blue}[TUNNEL]${colors.reset} ${stdout}`);
    });
}

// Funciones del servidor
function startServer() {
    return new Promise((resolve) => {
        log('Iniciando servidor con PM2...');
        exec('pm2 start ecosystem.config.js', (error, stdout, stderr) => {
            if (error) {
                error(`Error al iniciar servidor: ${error.message}`);
                resolve(false);
                return;
            }
            if (stderr) {
                console.log(`${colors.yellow}[SERVER]${colors.reset} ${stderr}`);
            }
            console.log(`${colors.green}[SERVER]${colors.reset} ${stdout}`);
            success('Servidor iniciado exitosamente');
            resolve(true);
        });
    });
}

function stopServer() {
    return new Promise((resolve) => {
        log('Deteniendo servidor...');
        exec('pm2 stop "Studio Server API"', (error, stdout, stderr) => {
            if (error) {
                error(`Error al detener servidor: ${error.message}`);
                resolve(false);
                return;
            }
            if (stderr) {
                console.log(`${colors.yellow}[SERVER]${colors.reset} ${stderr}`);
            }
            console.log(`${colors.green}[SERVER]${colors.reset} ${stdout}`);
            success('Servidor detenido');
            resolve(true);
        });
    });
}

function restartServer() {
    return new Promise((resolve) => {
        log('Reiniciando servidor...');
        exec('pm2 restart "Studio Server API"', (error, stdout, stderr) => {
            if (error) {
                error(`Error al reiniciar servidor: ${error.message}`);
                resolve(false);
                return;
            }
            if (stderr) {
                console.log(`${colors.yellow}[SERVER]${colors.reset} ${stderr}`);
            }
            console.log(`${colors.green}[SERVER]${colors.reset} ${stdout}`);
            success('Servidor reiniciado');
            resolve(true);
        });
    });
}

function serverStatus() {
    exec('pm2 status "Studio Server API"', (error, stdout, stderr) => {
        if (error) {
            error(`Error al obtener estado del servidor: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${colors.yellow}[SERVER]${colors.reset} ${stderr}`);
        }
        console.log(`${colors.green}[SERVER]${colors.reset} ${stdout}`);
    });
}

// Función principal de inicio
async function initialize() {
    log('Iniciando Studio Server API con túnel Cloudflare...');
    
    // Verificar si cloudflared está instalado
    exec('cloudflared version', (error) => {
        if (error) {
            error('cloudflared no está instalado. Instálalo desde: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/');
        } else {
            success('cloudflared detectado');
        }
    });

    // Iniciar túnel primero
    const tunnelStarted = await startTunnel();
    
    // Luego iniciar servidor
    if (tunnelStarted) {
        setTimeout(async () => {
            await startServer();
            log('Sistema completamente iniciado');
        }, 3000);
    } else {
        log('Iniciando servidor sin túnel...');
        await startServer();
    }
}

// Manejo de comandos de línea de comandos
function handleCommand(args) {
    const command = args[0];
    const subcommand = args[1];

    switch (command) {
        case 'server':
            switch (subcommand) {
                case 'on':
                    startServer();
                    break;
                case 'off':
                    stopServer();
                    break;
                case 'restart':
                    restartServer();
                    break;
                case 'status':
                    serverStatus();
                    break;
                default:
                    log('Comandos de servidor: on, off, restart, status');
            }
            break;
        
        case 'tunnel':
            switch (subcommand) {
                case 'on':
                    startTunnel();
                    break;
                case 'off':
                    stopTunnel();
                    break;
                case 'restart':
                    stopTunnel();
                    setTimeout(() => startTunnel(), 2000);
                    break;
                case 'ls':
                    listTunnels();
                    break;
                default:
                    log('Comandos de túnel: on, off, restart, ls');
            }
            break;
        
        case 'init':
            initialize();
            break;
        
        case 'help':
        default:
            console.log(`
${colors.bright}Studio Server API - Lanzador de Comandos${colors.reset}

${colors.cyan}Comandos disponibles:${colors.reset}

${colors.green}Inicialización:${colors.reset}
  init                    Inicia el sistema completo (túnel + servidor)

${colors.green}Servidor:${colors.reset}
  server on               Inicia el servidor
  server off              Detiene el servidor  
  server restart          Reinicia el servidor
  server status           Muestra el estado del servidor

${colors.green}Túnel Cloudflare:${colors.reset}
  tunnel on               Inicia el túnel
  tunnel off              Detiene el túnel
  tunnel restart          Reinicia el túnel
  tunnel ls               Lista túneles activos

${colors.green}Ayuda:${colors.reset}
  help                    Muestra esta ayuda
            `);
    }
}

// Manejo de cierre del proceso
process.on('SIGINT', () => {
    log('Cerrando aplicación...');
    if (tunnelProcess) {
        stopTunnel();
    }
    exec('pm2 stop "Studio Server API"', () => {
        process.exit(0);
    });
});

// Punto de entrada
const args = process.argv.slice(2);
if (args.length === 0) {
    initialize();
} else {
    handleCommand(args);
}