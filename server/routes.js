
'use strict'

module.exports = function(app) {

    app.use('/users', require('./routes/users'))
    app.use('/auth/local', require('./auth/local'))

   
    
}