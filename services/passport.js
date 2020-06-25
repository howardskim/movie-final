const passport = require('passport');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/User');

//create local strategy
const localOptions = {
    usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email}, (err, user) => {
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false);
        };
        user.comparePassword(password, function(err, isMatch){
            if(err){
                return done(err)
            }
            if(!isMatch){
                return done(null, false);
            }
            return done(null, user);
        })
    })
})

//configure options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret,
  passReqToCallback: true,
  proxy: true
};

const jwtLogin = new JwtStrategy(jwtOptions, function (req, payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      req.user = user
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


passport.serializeUser(function (user, done) {
  done(null, user.id);
  // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});