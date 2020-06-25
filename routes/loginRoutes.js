const AuthenticationController = require('../controllers/authenticate');
const passport = require("passport");

//Intercepter/MiddleWare

const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const requireSign = passport.authenticate("local", {
  session: false,
});

module.exports = (app) => {
    // app.post('/login', AuthenticationController.signup)
    
}