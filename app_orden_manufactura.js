var express = require('express'); 
var path = require('path');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');   

var index = require('./routes/index');  
var products = require('./controllers/ctlM_product');
var user = require('./routes/user');
// var hr_employee = require('./routes/hr_employee');
var manufature = require('./routes/order_manufactura');  
var cors = require('cors');   
var app = express(); 

// SSL
var https = require('https');
var fs = require('fs');

//  var mongoDB = 'mongodb+srv://developer:38140553@cluster0-wa2kb.mongodb.net/manufactura'; 
// var mongoDB = 'mongodb://mongo-admin:passw0rd@127.0.0.1:27017/manufactura?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'; 

var session = require('express-session');
app.use(cors());   
 
// Certificados SSL
// var options = {
//   key: fs.readFileSync('_.refividrio.com.mx.key'),
//   cert: fs.readFileSync('_.refividrio.com.mx.crt')
// };

const options = {
  key: fs.readFileSync('SSL/_.code-byte.com.mx.key'),
  cert: fs.readFileSync('SSL/_.code-byte.com.mx.crt'),
  ca: fs.readFileSync('SSL/SectigoRSADomainValidationSecureServerCA.crt')
};

//BD
// mongoose.connect(mongoDB);

// mongoose.connect('mongodb://74.208.159.188:27017/manufactura', {
//     auth: {
//       user: 'u_order_manufacturer',
//       password: 'mongo-u-om.#d'
//     }
//   })
// .then(() => console.log('connection successful'))
// .catch((err) => console.error(err));

 
mongoose.connect('mongodb://74.208.159.188:27017/manufactura', {
  auth: {user: 'u_order_manufacturer',password: 'mongo-u-om.#d'},
  useNewUrlParser: true, useUnifiedTopology: true,'useCreateIndex': true
})
.then(() => console.log('connection Mongo DB successful'))
.catch((err) => console.error(err));
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
  
// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
//use sessions for tracking logins
app.use(session({
  name:'manufacturaMG',
  secret: 'cod:ref:gmg', 
  saveUninitialized: false, 
  resave: true,  
  cookie  : {secure: false, httpOnly: true }
}));

 

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 

app.use(express.static(path.join(__dirname, 'public'))); 


app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});
 

app.use('/', index);
app.use('/productos', products);
app.use('/user', user);
app.use('/manufactura', manufature); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); 
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 
 
app.use(express.static('public')); 
  
module.exports = app; 
// app.listen(3000, function () {
//   console.log('3000!');
// }); 

https.createServer(options, app).listen(3000);
const port = process.env.PORT || 8080;
app.listen(port,  (err) =>{
  if(err)return console.log(err);
  console.log('Corriendo en el servidor: ' + port);
})





