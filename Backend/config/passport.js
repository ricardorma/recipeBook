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
        /*
        let user = await User.findOne({ providerId: profile.id, provider: 'google' });

        if (!user) {
          user = new User({
            providerId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          await user.save();
        }*/
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
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id, provider: 'github' });

        if (!user) {
          user = new User({
            providerId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
