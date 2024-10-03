const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Iniciar sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/auth/google/callback', passport.authenticate('google', { session: true }), (req, res) => {
  res.redirect(`${process.env.BASE_FRONT_URL}`); // Redirige al frontend con el token
});

// Iniciar sesión con GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback de GitHub
router.get('/auth/github/callback', passport.authenticate('github', { session: true }), (req, res) => {
  res.redirect(`${process.env.BASE_FRONT_URL}`); // Redirige al frontend con el token
});

// Cerrar sesión (opcional)
router.post('/logout', (req, res) => {
  // Destruir la sesión
  res.setHeader("Access-Control-Allow-Origin", process.env.BASE_FRONT_URL); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al destruir la sesión' });
    }
    // Eliminar la cookie de sesión
    res.clearCookie('connect.sid', { 
      path: '/', 
      httpOnly: true, // Asegura que solo sea accesible a través de HTTP(S)
      secure: process.env.NODE_ENV === 'production',  // Solo enviar en HTTPS si está en producción
      sameSite: 'None',  // Necesario para entornos cross-origin
    });
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });
});


module.exports = router;
