const passport = require('passport');
const { app } = require('../app');
const User = require('../database/models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const {
  findUserPerEmail,
  findUserPerGoogleId,
} = require('../queries/user.queries');
const util = require('util');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);// now user is available thru req.user
    } catch(e) {
      done(e, null);
    }
})

passport.use('local', new LocalStrategy(
  { usernameField: 'email'}, 
  async (email, password, done) => {
  try {
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        done(null, user);// this logs automatically the user
      } else {
        done(null, false, { message: 'invalid credential' });
      }
    } else {
      done(null, false, { message: 'user not found' });
    }
      
  } catch(e) {
      done(e);
  }
    
}))

passport.use('google', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/cb',
  },
  async (accessToken, refreshToken, profile, done) => {
    //console.log(util.inspect(profile, { compact: true, depth: 5, breakLength: 80 }));
    // done(null, false, {message: 'this is a test'});
    try {
      const user = await findUserPerGoogleId(profile.id); 
      if (user) {
        done(null, user);// this logs automatically the user
      } else {
        const newUser = new User({
          username: profile.displayName,
          local: {
            googleId: profile.id,
            email: profile.emails[0].value,
          },
        });
        const savedUser = await newUser.save();
        done(null, savedUser);
      }
    } catch (e) {
      done(e);
    }
  }
));
