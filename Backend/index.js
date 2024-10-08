// Configuración de la aplicación
const express = require('express')
const swaggerConfig = require('./config/swagger');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');
const multer = require('multer');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser')

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

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [process.env.BASE_FRONT_URL];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const storage = multer.memoryStorage();  // Configura multer para almacenar en memoria, no en el disco
const upload = multer({ storage: storage });
app.use(upload.single('foto'));  // Manejar la carga de una sola imagen

// Inicio express
app.use(express.json()); 
app.use(logger('dev'));  

app.use(cookieParser());
app.enable("trust proxy", 1);
app.set("trust proxy", 1);

// Configurar sesión con cookies 
app.use(session({
  secret: process.env.SECRET_KEY, // Asegúrate de definir esta variable de entorno
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // Tu URI de MongoDB
    ttl: 14 * 24 * 60 * 60 // Duración de la sesión en segundos
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie: 24 horas
    httpOnly: true,
    secure: true,
    sameSite: 'none', // Solo usar cookies seguras en producción (HTTPS)
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
