const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const passport=require('passport');
const mongoose=require('mongoose');
const cors=require('cors');
const config=require('./config/local')
const app= express();

app.use(cors());
//connection to database
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
console.log('Connected to Database'+config.database);
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

require('./config/express')(app)
require('./routes')(app)
app.use('*', function(req, res, next) {
    var indexFile = path.resolve(__dirname, 'public/index.html')
    res.sendFile(indexFile)
})
module.exports = app;
const port = process.env.PORT || '8080';
app.set('port', port);

app.listen(port,()=>{
    console.log('server running on ' + port)
})

