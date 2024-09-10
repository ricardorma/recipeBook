// Configuración de la aplicación
const express = require('express')
const swaggerConfig = require('./config/swagger');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const cookieSession = require('cookie-session')
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
app.use(cors());      

// Configurar sesión con cookies 
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY],
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
app.use('/recipeBook', recipeRoutes);
app.use('/', authRoutes);
app.use('/users', userRoutes);


/*app.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
    console.log('Documentación de la API en http://localhost:3000/api-docs');
})*/

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('Servidor corriendo en el puerto', port);
    console.log('Documentación de la API en http://localhost:3000/api-docs');
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
