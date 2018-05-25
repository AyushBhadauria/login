
var baseUrl = 'localhost:8080'
module.exports={
    baseUrl: baseUrl,
    database: 'mongodb://user:123456@ds235840.mlab.com:35840/logindemonew',
    secrets: {
        session: 'slick-call-secret'
    },
    mailer: {
        'service': 'smtp',
        'auth': {
          'user':'ayushkickass@gmail.com',
           'pass': 'ayushMean@123'          
        },
        'from': 'loginModule <admin@loginModule.in>',
    },

}

