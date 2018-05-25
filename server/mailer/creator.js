
const Mailer = require('./mailer');

  exports.forgotPassword = function(req, to, option) {
    Mailer.sendMail('forgot-password.html', to, option, function(err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    })
  }
  exports.emailVerify = function(req, to, option) {
    Mailer.sendMail('verifyEmail.html', to, option, function(err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    })
  }
  exports.confirmReset = function(req, to, option) {
    Mailer.sendMail('reset-confirm.html', to, option, function(err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    })
  }
  exports.newUser = function(req, to, option) {
    Mailer.sendMail('welcome.html', to, option, function(err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    })
  }
