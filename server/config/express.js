var passport = require('passport')
var session = require('express-session')
var config = require('./local')
module.exports = function(app) {
    app.use(session({
            secret: config.secrets.session,
            resave: true,
            saveUninitialized: true
        })) 
    app.use(passport.initialize())
    app.use(passport.session())
    
    
}