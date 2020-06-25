const bcrypt = require('bcrypt');
const AuthenticationController = require('../controllers/authenticate');
const passportService = require("../services/passport");
const passport = require("passport");
const requireLogin = require('../middlewares/requireLogin');
//Intercepter/MiddleWare

const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const requireSign = passport.authenticate("local", {
    session: false
})

module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.json({success: 'authorized'})
    })
    app.post('/api/signup', AuthenticationController.signup);
    app.post('/api/signin', requireSign, AuthenticationController.signin)
    app.post("/api/addMovie",  AuthenticationController.addMovie);
    app.get("/api/getFavorites/:id", AuthenticationController.getFavorites)
    app.delete("/api/deleteMovie", AuthenticationController.deleteMovie);
}