const { exec } = require('child_process');

// Variables de entorno esperadas:
// COMANDO1, COMANDO2, COMANDO3

const comandos = [
  process.env.COMANDO1,
  process.env.COMANDO2,
  process.env.COMANDO3
];

if (comandos.some(cmd => !cmd)) {
  console.error('Faltan una o más variables de entorno: COMANDO1, COMANDO2, COMANDO3');
  process.exit(1);
}

// Función recursiva para ejecutar los comandos uno a uno
function ejecutarComando(index) {
  if (index >= comandos.length) return;

  exec(comandos[index], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar COMANDO${index + 1}: ${error.message}`);
      return;
    }

    console.log(`Salida de COMANDO${index + 1}:\n${stdout}`);
    ejecutarComando(index + 1); // Llamada recursiva al siguiente comando
  });
}

ejecutarComando(0);