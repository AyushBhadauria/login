
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
            'user':'ayushnewdemo@gmail.com',
            'pass': 'Ayush339'             
        },
        'from': 'loginModule <admin@loginModule.in>',
    },

}

