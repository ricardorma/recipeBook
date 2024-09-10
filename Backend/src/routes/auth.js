const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Iniciar sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const reqUser = req.user;
  const returned = {
    id: reqUser?.id,
    username: reqUser?.username,
    name: reqUser?.displayName,
    avatarUrl: reqUser?.photos[0]?.value || null,
  };
  const token = jwt.sign(returned, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.redirect(`${process.env.BASE_FRONT_URL}?token=${token}`); // Redirige al frontend con el token
});

// Iniciar sesión con GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback de GitHub
router.get('/auth/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.redirect(`${process.env.BASE_FRONT_URL}?token=${token}`); // Redirige al frontend con el token
});

// Cerrar sesión (opcional)
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  });
});

module.exports = router;
