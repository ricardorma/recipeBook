// Configuración de la aplicación
const express = require('express')
const swaggerConfig = require('./config/swagger');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');
const multer = require('multer');

// BBDD
const mongoose = require('mongoose')

// Configuración del puerto
const port = process.env.PORT || 3000;

// LOGGER
const logger = require('morgan')

// Definición de rutas
const recipeRoutes = require('./src/routes/recipe');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user')

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

app.use(
  multer({ storage: fileStorage}).single('foto')
);

// Inicio express
app.use(express.json()); 
app.use(logger('dev'));  
app.use(cors({
  origin: process.env.BASE_FRONT_URL,  // La URL de tu frontend
  credentials: true  // Permite el envío de cookies
}));  

// Configurar sesión con cookies 
app.use(session({
  secret: process.env.SECRET_KEY,  // Secreto para firmar las cookies de sesión
  resave: false,                   // No vuelve a guardar la sesión si no ha cambiado
  saveUninitialized: false,        // No guarda sesiones vacías
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,   // Duración de la cookie: 24 horas
    httpOnly: true,                // No accesible desde JavaScript en el frontend
    secure: process.env.NODE_ENV === 'production' // Solo usar cookies seguras en producción (HTTPS)
  }
}));

app.use(passport.initialize());
app.use(passport.session());


swaggerConfig(app); 

// Manejo de errores
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    })
});

// Manejo de rutas
app.use('/recipeBook', recipeRoutes);
app.use('/', authRoutes);
app.use('/users', userRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
