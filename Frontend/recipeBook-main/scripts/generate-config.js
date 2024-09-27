const fs = require('fs');
const path = require('path');

// Detectar si es producción o desarrollo
const env = process.env.NODE_ENV || 'development';  // Usar "development" por defecto

// Definir rutas de los archivos de configuración
const configFilePath = path.resolve(__dirname, `/src/environments/config/config.${env}.json`);
const outputFilePath = path.resolve(__dirname, '/src/assets/config/config.json');

// Leer el archivo de configuración base
let config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

// Sobrescribir valores con variables de entorno si existen
config.apiUrl = process.env.API_URL || config.apiUrl;
config.apiAuth = process.env.API_AUTH || config.apiAuth;
config.apiUsers = process.env.API_USERS || config.apiUsers;

// Guardar el archivo final de configuración
fs.writeFileSync(outputFilePath, JSON.stringify(config, null, 2));

console.log(`Archivo de configuración ${env} copiado y procesado en ${outputFilePath}`);
