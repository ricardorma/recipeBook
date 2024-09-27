const fs = require('fs');
const path = require('path');

// Detectar si es producción o desarrollo
const env = process.env.NODE_ENV || 'development';  // Usar "development" por defecto
let configFilePath = '';
let config = {};

// Definir rutas de los archivos de configuración
if (env === 'development') {
  configFilePath = path.resolve(__dirname, '/src/environments/config/config.development.json');

  // Verificar si el archivo de configuración existe
  if (!fs.existsSync(configFilePath)) {
    console.error(`Error: El archivo de configuración ${configFilePath} no existe.`);
    process.exit(1);  // Salir con un código de error
  }

  // Leer el archivo de configuración base
  config = JSON.parse(fs.readFileSync(configFilePath, 'utf8')); 
} else {
  // En producción, crear el objeto de configuración directamente
  config.apiUrl = process.env.API_URL;
  config.apiAuth = process.env.API_AUTH;
  config.apiUsers = process.env.API_USERS;

  // Verificar que las variables de entorno estén definidas
  if (!config.apiUrl || !config.apiAuth || !config.apiUsers) {
    console.error('Error: Las variables de entorno no están definidas en producción.');
    process.exit(1);  // Salir con un código de error
  }
}

const outputFilePath = path.resolve(__dirname, '/src/assets/config/config.json');

// Guardar el archivo final de configuración
fs.writeFileSync(outputFilePath, JSON.stringify(config, null, 2));

console.log(`Archivo de configuración ${env} copiado y procesado en ${outputFilePath}`);
