// Configuración de la aplicación
const express = require('express')
const swaggerConfig = require('./config/swagger');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('./config/passport');

// BBDD
const mongoose = require('mongoose')

// Configuración del puerto
const port = process.env.PORT || 3000;

// LOGGER
const logger = require('morgan')

// Definición de rutas
const recipeRoutes = require('./src/routes/recipe');
const authRoutes = require('./src/routes/auth');

const app = express();


// Inicio express
app.use(express.json()); 
app.use(logger('dev'));  
app.use(cors());      

// Configurar sesión con cookies 
app.use(cookieSession({
    name: 'session',
    keys: ['somesupersecretsecret'],
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }));
  
app.use(passport.initialize());
app.use(passport.session());

swaggerConfig(app); 

// Manejo de errores
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    })
});

// Manejo de rutas
app.use('/recipe', recipeRoutes);
app.use('/api', authRoutes);


app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
    console.log('Documentación de la API en http://localhost:3000/api-docs');
})