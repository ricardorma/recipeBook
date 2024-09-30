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

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.BASE_FRONT_URL
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === process.env.BASE_FRONT_URL &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");
  }});

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
