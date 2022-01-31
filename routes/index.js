var express = require('express');
var router = express.Router();
var User = require('../models/User'); 
// GET route for reading data

router.get('/', function (req, res, next) {  
  return res.render('../views/user/login');
});
 
router.post('/', function (req, res, next) { 
  if (req.body.logemail && req.body.logpassword) { 
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) { 
        res.render('../views/user/login',{errores:'Error de Usuario o Password.'}); 
      } else {
        req.session.userId = user._id;
        req.session.mail = user.mail;
        req.session.rol = user.rol; 
        req.session.password = user.password;
        // req.session.user = user.user; 
        req.session.user = user; 
        req.session.cookie.expires = new Date(Date.now() +  (480 * 1000 * 30));   
        req.session.name = 'manufacturaMG'; 
        return res.redirect('/manufactura');
      }
    });
  } else {
    res.render('../views/user/login',{errores:'Error de Usuario o Password.' + err}); 
    return next(err);
  }
});

 
// GET route after registering
router.get(function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) { 
          res.redirect('../../../');
        } else { 
          return next();//res.redirect('/user'); 
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/'); 
      }
    });
  }
}); 
module.exports = router;