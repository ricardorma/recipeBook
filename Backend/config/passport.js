const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../src/models/userBD');

passport.use(
  new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, profile);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, profile);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);  // Serializa solo el ID del usuario
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = { id };  // Recupera el objeto del usuario
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
