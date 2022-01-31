var User = require("../models/User");
var bcrypt = require('bcrypt'); 
var userController = {};
const ad_user = require("../models/ad_user");
//List
userController.list = function(req, res){  
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
            if (error || !userlogin) { 
                return  res.redirect("../../../");
            } else {
                //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
                User.find({}).exec(function(err, users){
                    if(userlogin.rol == "Admin"){
                        if( err ){   
                            console.log('Error: ', err); 
                            res.render('../views/user/index',{errores:err}); 
                            return; 
                        }  
                        return  res.render('../views/user/index', {users: users} );
                    }else{
                        console.log("NO tiene acceso"); 
                        return  res.redirect("../../../");
                    } 
                });     
            }
          });   
}; 

//End List


//Show datail
userController.show = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
            if (error || !userlogin) { 
                return  res.redirect("../../../");
            } else {
                User.findOne({_id: req.params.id}).exec(function(err, user){
                    //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));    
                    if(userlogin.rol == "Admin"){ 
                        if( err ){   
                            console.log('Error: ', err); 
                            res.render('../views/user/show',{errores:err}); 
                            return; 
                        }  
                        return  res.render('../views/user/show', {user: user} );
                    }else{ 
                        console.log("NO tiene acceso"); 
                        return  res.redirect("../../../");
                    }  
                }); 
            }
          });   
};
//End Show datail

//save 
userController.create = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));    
            if(userlogin.rol == "Admin"){
                ad_user.obtener().then(ad_users => { 
                    return res.render('../views/user/create', {ad_users: ad_users} ); 
                }).catch(err => {
                    console.log(err);
                    return res.status(500).send("Error obteniendo Empleados");
                });  
            }else{
                console.log("NO tiene acceso"); 
                return  res.redirect("../../../");
            } 
        }
      }); 
};  


userController.save = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));   
            var user = new User( req.body );    
            user.save(function(err){   
                if(userlogin.rol == "Admin"){
                    if( err ){   
                        console.log('Error: ', err); 
                        if (err.code == 11000 ) {
                            return   res.render('../views/user/create',{errores: "Erro grave, no se puede Duplicar: ID de ADempiere, Usuario, Email <a  href='../../user/create'>  Intentar de nuevo </a>"}); 
                        } else {
                            return  res.render('../views/user/create',{errores: err + " <a  href='../../user/create'>  Intentar de nuevo </a>"}); 
                        } 
                        return; 
                    }  
                    console.log("Successfully created a user. :)");
                    return  res.redirect("/user/show/"+user._id); 
                }else{
                    console.log("NO tiene acceso");  
                    return  res.redirect("../../../");
                }  
            });
        }
    });  
};
//end save



//edit
userController.edit = function(req, res) {
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) {  
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else { 
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
            User.findOne({_id: req.params.id}).exec(function (err, user) {
                if(userlogin.rol == "Admin"){
                    if( err ){   
                        console.log('Error: ', err); 
                        res.render('../views/user/edit',{errores:err}); 
                        return; 
                    }  
                    return    res.render("../views/user/edit", {user: user});
                }else{
                    console.log("NO tiene acceso"); 
                    return  res.redirect("../../../");
                } 
            });   
        }
      });   
   
  };

 


//changePassword 
userController.changePassword = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
            User.findOne({_id: req.params.id}).exec(function (err, user) { 
                if(userlogin.rol == "Admin"){
                    if( err ){    
                        res.render('../views/user/changePassword',{errores:err,user: user}); 
                        return; 
                    }  
                    return  res.render('../views/user/changePassword', {user: user});
                }else{ 
                    if(userlogin.id === user.id){
                         return    res.render('../views/user/changePassword', {user: user});
                    }else{     
                         return  res.redirect("../../../");
                    } 
                }  
            }); 
        }
      }); 
};  

 
userController.changePasswordFN = function(req, res){  
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) {  
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else { 
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
            if(userlogin.rol == "Admin"){    
                User.findByIdAndUpdate( req.body.id, {$set: { 
                    password:  req.body.passwordNew + "replacement_code_for_encryption" , 
                    }}, { new: true },
                    function( err, user){ 
                        if( err ){ 
                            console.log('Error: ', err); 
                            res.render('../views/user/changePassword',{errores:err, user:user}); 
                        } else{ 
                            res.redirect('/user/show/' + user._id);
                        } 
                }); 
            }else{
                bcrypt.compare(req.body.passwordOld, userlogin.password, function (err, result) {
                    if (result === true &&  userlogin.esActivo) {   
                                User.findByIdAndUpdate( req.body.id, {$set: { 
                                    password:  req.body.passwordNew + "replacement_code_for_encryption", 
                                    }}, { new: true },
                                    function( err, user){ 
                                        if( err ){ 
                                            console.log('Error: ', err);      
                                            res.render('../views/user/changePassword',{errores:err, user:user}); 
                                        } else{
                                              console.log( user ); 
                                              res.redirect('../../logout'); 
                                        } 
                                });  
                    } else {
                        res.render('../views/user/changePassword',{errores:"La contraseña anterior no es correcta", user:userlogin}); 
                    }
                })
            }     
        }
    }); 

};
 
 
userController.update = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) { 
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else { 
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
            if(userlogin.rol == "Admin"){ 
                User.findByIdAndUpdate( req.params.id, {$set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    rol: req.body.rol,
                    user: req.body.user, 
                    mail: req.body.mail, 
                    ad_user_id: req.body.ad_user_id,
                    esActivo:req.body.esActivo, 
                    }}, { new: true },
                    function( err, user){ 
                        if( err ){  
                            var string = encodeURIComponent(err.code);
                            res.redirect('/user/edit/' + req.params.id + '?origen=Actualización de Usuario&error='+string);
                        } else{  
                            res.redirect('/user/show/' + user._id);
                        } 
                }); 
            }else{ 
                return  res.redirect("../../../");
            }     
        }
    }); 

};
 
 
//Delete
  userController.delete = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  }
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, userlogin) {  
        if (error || !userlogin) { 
            return  res.redirect("../../../");
        } else {
            User.remove({_id: req.params.id}, function(err){
            if( err ){ console.log('Error: ', err); return; } 
            console.log("user deleted!"); 
                //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));
                if(userlogin.rol == "Admin"){
                    return   res.redirect("/user");
                }else{
                    console.log("NO tiene acceso"); 
                    return  res.redirect("../../../");
                }  
            }); 
        }
    }); 
};
//END Delete


 



module.exports = userController;