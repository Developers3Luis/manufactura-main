var objManufactura = require("../models/order_manufacture"); 
var objManufacturaAD = require("../models/manufactureAD"); 
var order_manufac_Schema = {};
const productosModel = require("../models/m_product");
const organizacion = require("../models/organizacion"); 
var User = require('../models/User');
const hr_employeeModel = require("../models/hr_employee");
//List
order_manufac_Schema.list = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
    User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) { 
        if (error || !user) {   
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));   
            objManufactura.deleteMany({sinc_with_ad: { $lte: new Date(Date.now() - (1000 * 3600 * 24 * 2))} },
             function(err){
                if( err ){ 
                    console.log(err);
                    return   
                }else{
                    console.log("Eliminado");
                }  
            });  
            objManufactura.find({create_by: user._id}).sort({created_at: -1}).exec(function(err, manufacturas){ 
                if( err ){   return res.render('../views/orden_manufactura/index', {errores: err, productos: "",manufacturas: "",organizaciones: "" ,  title:"Manufactura: Lista"} );  }    
                var concat = "0";
                for(var i = 0; i < manufacturas.length ;i++){ 
                    if(i == 0)
                        concat =  manufacturas[i].m_product_id ;
                    else
                        concat +=  "," + manufacturas[i].m_product_id ;
                }  
                var concatEmployes = "0";
                for(var i = 0; i < manufacturas.length ;i++){ 
                    if(i == 0)
                         concatEmployes =  manufacturas[i].hr_employe_id ;
                    else
                        concatEmployes +=  "," + manufacturas[i].hr_employe_id ;
                }
                productosModel.obtenerPorIds(concat).then(productosc => {  
                    hr_employeeModel.obtenerPorIds(concatEmployes).then(hr_employees => {  
                        // console.log(hr_employees);
                        let id_usr_login = 0;
                        if (req.session.user.rol == 'Admin') {
                            id_usr_login = "Admin";
                        }else{
                            id_usr_login = req.session.user.ad_user_id;
                        } 
                        organizacion.obtener(id_usr_login)
                        .then(organizacion => {     
                            return res.render('../views/orden_manufactura/index', {manufacturas: manufacturas, productos: productosc,organizaciones: organizacion ,  title:"Manufactura: Lista",hr_employees:hr_employees } );   
                        })
                        .catch(err => {
                            return res.render('../views/orden_manufactura/index', {errores: err, productos: "",manufacturas: "" ,organizaciones: "",  title:"Manufactura: Lista" } );  
                        });  
                    }).catch(err => { 
                        return res.render('../views/orden_manufactura/index', {errores: err, productos: "",manufacturas: "",organizaciones: "",  title:"Manufactura: Lista" } );     
                    });      
                }).catch(err => { 
                    return res.render('../views/orden_manufactura/index', {errores: err, productos: "",manufacturas: "",organizaciones: "",  title:"Manufactura: Lista" } );     
                });      

            }) 
       } 
    });  
 
}; 

//End List

 
//Show datail
order_manufac_Schema.show = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));    
            objManufactura.findOne({_id: req.params.id}).exec(function(err, manufactura){
                if( err ){ console.log('Error: ', err); return; }   
                return  res.render('../views/orden_manufactura/show', {manufactura: manufactura  ,  title:"Manufactura"} ); 
            }); 
        }
    });  
};
//End Show datail

 
//create
order_manufac_Schema.create = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else { 
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));   
            let id_usr_login = 0;
            if (req.session.user.rol == 'Admin') {
                id_usr_login = "Admin";
            }else{
                id_usr_login = req.session.user.ad_user_id;
            } 
            organizacion.obtener(id_usr_login)
            .then(organizacion => {  
                // console.log(organizacion); 
                return   res.render('../views/orden_manufactura/create', {productos: "" ,organizaciones: organizacion,  title:"Manufactura: Crear", warehouses: "" } );
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send("Error obteniendo productos");
            });      
        }
      });  
};   

order_manufac_Schema.save = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));    
            console.log(req.body); 
            var objLmanufactura = new objManufactura( req.body );  
            objLmanufactura.create_by = user.id;
            objLmanufactura.created_at = new Date(Date.now());
            objLmanufactura.save(function(err){
                if( err ){ console.log('Error: ', err); return; } 
                     console.log("Successfully created a manufactura. :)"); 
                return res.redirect('../../manufactura' ); 
            });
            }
    }); 
};
//end save


//edit
order_manufac_Schema.edit = function(req, res) {   
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else {     
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));      
            objManufactura.findOne({_id: req.params.id}).exec(function (err, manufactura) {//buscar manufactura
            if (err) { console.log("Error:", err); return; } //error manufactura 
                    let id_usr_login = 0;
                    if (req.session.user.rol == 'Admin') {
                        id_usr_login = "Admin";
                    }else{
                        id_usr_login = req.session.user.ad_user_id;
                    } 
                    organizacion.obtener(id_usr_login).then(organizacions => { 
                            productosModel.obtener(manufactura.ad_org_id).then(productosc => { 
                            organizacion.obteneralmacenes(manufactura.ad_org_id).then(almacenes => { 
                                    return  res.render('../views/orden_manufactura/edit', {productos: productosc ,organizaciones: organizacions , manufactura: manufactura ,warehouses: almacenes,  title:"Manufactura: Editar"} );        
                            }).catch(err => {
                                console.log(err);
                                return res.status(500).send("Error obteniendo Almacenes");
                            }); 
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).send("Error obteniendo Productos");
                        });  
                    }).catch(err => {
                        console.log(err);
                        return res.status(500).send("Error obteniendo productos");
                    });  
            });
        }
    }); 
  };

order_manufac_Schema.update = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else {
            //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30)); 
            objManufactura.findByIdAndUpdate( req.params.id, {$set: { 
                m_product_id: req.body.m_product_id,
                ad_org_id: req.body.ad_org_id,
                m_warehouse_id: req.body.m_warehouse_id,
                cantidad: req.body.cantidad,
                update_by: user.id,  
                update_at: new Date(Date.now())  
            }}, { new: true },
            function( err, user){
                if( err ){ 
                    console.log('Error: ', err);  
                    return res.render('../views/manufactura/edit', {errores:err ,  title:"Manufactura"} );    
                } 
                console.log( user );  
                res.redirect("/manufactura");
            });
       }
     });  
  };
//END edit
 
//Delete
  order_manufac_Schema.delete = function(req, res){  
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
         User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
            if (error || !user) { 
                return  res.redirect("../../../");
            } else {
                //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));      
                objManufactura.remove({_id: req.params.id}, function(err){
                    if( err ){ return res.redirect('../../manufactura' + '?origen=Eliminar Orden de Manufactura&error='+ "error: " + err); } 
                    return res.redirect('../../manufactura' );
                }); 
            }     
    });
}  
//END Delete

//filtrar
order_manufac_Schema.obtenerMoldes = function(req, res){  
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {     
        return res.send("Error en la sesion"); } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return res.send("Error en la sesion"); 
        } else {       
                productosModel 
                .obtenerMoldes(req.body.m_product_id)
                .then(moldes => {     
                    return res.send(JSON.stringify(moldes));  
                }).catch(err => {
                    console.log(err);
                    return res.send("Error obteniendo productos");
                });   
            }    
        }); 
}; 

//filtrar
order_manufac_Schema.filterProduct = function(req, res){  
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {     return res.send("Error en la sesion"); } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return res.send("Error en la sesion"); 
        } else {
            // req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));       
                productosModel 
                .obtener(req.body.code)
                .then(productos => {     
                            organizacion.obteneralmacenes(req.body.code).then(almacenes => {
                                hr_employeeModel
                                .obtener(req.body.code)
                                .then(hr_employees => {    
                                    return res.send( '{"array":{"productos":' + JSON.stringify(productos) +' ,"almacenes":'+ JSON.stringify(almacenes) + ' ,"employes":'+ JSON.stringify(hr_employees) + ' }}');  
                                })
                                .catch(err => {
                                    console.log(err);
                                    return "Error obteniendo hr_employee";
                                });  
                            }).catch(err => {
                                console.log(err);
                                return res.status(500).send("Error obteniendo almacenes");
                            }); 
                })
                .catch(err => {
                    console.log(err);
                    return res.send("Error obteniendo productos");
                });   
            }    
        }); 
}; 

//Delete
order_manufac_Schema.sincAD = function(req, res){
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
            if (error || !user) { 
                return  res.redirect("../../../");
            } else {
                //req.session.cookie.expires = new Date(Date.now() +  (30 * 1000 * 30));      
                objManufactura.find({_id: req.params.id}).exec(function(err, manufactura){
                    console.log(req.params);
                    if(err){ 
                        return res.redirect('../../manufactura' + 
                            '?origen=sincronizar Orden en ADempiere&error='+ 
                            "Algo no permitio Ejecutar la sincronización en la BD de Adempiere: " + err); 
                    }
                    if (manufactura.rf_id_molde_id == "") {
                        manufactura.rf_id_molde_id = 0;
                    } 
                    var qryt  = ' adempiere.rf_insertordermanufactura('  + 
                    manufactura[0].ad_org_id + ',' + manufactura[0].m_product_id + ','  + 
                    manufactura[0].cantidad + ','  + 1000033+ ','  +
                    manufactura[0].m_warehouse_id + ',' + user.ad_user_id + ',' +
                    manufactura[0].hr_employe_id + ') as ordendoc '; 
                    objManufacturaAD
                    .insertarOrdenAD(qryt)
                    .then(resultAD => {  
                        console.log(resultAD);
                        if (typeof resultAD[0].ordendoc !== 'undefined') {  
                            console.log(resultAD); 
                            manufactura.sincronizado = true;
                            manufactura.orden_ad = resultAD[0].ordendoc;
                            manufactura.update_by = user.id;
                            manufactura.update_at = new Date(Date.now());
                            manufactura.sinc_with_ad = new Date(Date.now()); 
                            manufactura.save();  
                            return res.redirect('../../manufactura' );
                        }else{
                            return res.redirect('../../manufactura' + '?origen=sincronizar Orden en ADempiere&error='+ "Algo no permitio Ejecutar la sincronización en la BD de Adempiere: " + resultAD.ordendoc);
                        }   
                    })
                    .catch(err => {
                        console.log(err);
                        return res.redirect('../../manufactura' + '?origen=sincronizar Orden en ADempiere&error='+ "Algo no permitio Ejecutar la sincronización en la BD de Adempiere: " + err );
                    });  
                });
              
            }
    });   
 
};
    
order_manufac_Schema.grilla = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) { 
            return  res.redirect("../../../");
        } else {
            let id_usr_login = 0;
            if (req.session.user.rol == 'Admin') {
                id_usr_login = "Admin";
            }else{
                id_usr_login = req.session.user.ad_user_id;
            } 
            organizacion.obtener(id_usr_login)
            .then(organizacion => {   
            return  res.render('../views/orden_manufactura/grilla', 
                                    {
                                        productos: "" ,
                                        organizaciones: organizacion,  
                                        title:"Manufactura: Crear Lista", 
                                        warehouses: "" 
                                    }
                                );
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).send("Error obteniendo Organizaciones: " + err);
                    });     
        }
    });   
};               


order_manufac_Schema.saveAndSinc = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) {                 
        } else {  
            try {  
                const data = JSON.parse(req.body.json);  
                    var qryt = " 0 as ntc";
                    for (var key in data)
                    { 
                        var orden = data[key];  
                        // console.log(orden);
                        var objLmanufactura = new objManufactura( orden );   
                        objLmanufactura.create_by = user.id;
                        objLmanufactura.created_at = new Date(Date.now());
                        if (orden.rf_id_molde_id == "") {
                            orden.rf_id_molde_id = 0;
                        }
                        qryt += ',adempiere.rf_insertordermanufactura('  + 
                        orden.ad_org_id + ',' + orden.m_product_id + ','  + 
                        orden.cantidad + ','  + 1000033+ ','  +
                        orden.m_warehouse_id + ',' + user.ad_user_id + ',' +
                        orden.hr_employe_id + ',' + orden.rf_id_molde_id + ') as "'+ objLmanufactura.id + '"'; 
                        objLmanufactura.save(function(err){
                            if( err ){ console.log('Error: ', err); }   
                        });
                    }   
                    objManufacturaAD
                    .insertarOrdenAD(qryt)
                    .then(resultAD => {    
                        for (var key in resultAD)
                        { 
                            var ordenResult = resultAD[key];   
                            for (var key2 in ordenResult)
                            { 
                                if (key2 != "ntc" && ordenResult != 0 && ordenResult != '0' ) {
                                    var ordenResult2= ordenResult[key2];   
                                    console.log(key2 + " :" + ordenResult2);  
                                    objManufactura.findByIdAndUpdate(key2, {$set: { 
                                        sincronizado : true,
                                        orden_ad : ordenResult2,
                                        update_by : user.id,
                                        update_at : new Date(Date.now()),
                                        sinc_with_ad : new Date(Date.now()),
                                    }}, { new: true },
                                    function( err, manuc){
                                        if( err ){ console.log('Error: ', err); }   
                                    });
                                } 
                            } 
                        }    
                    })
                    .catch(err => {
                        console.log(err); 
                    });   
                    return res.status(200).send("Correcto"); 
            } catch (error) {
                return res.status(500).send(error) ;
            } 
        }
    }); 
};
 
order_manufac_Schema.saveGrilla = function(req, res){ 
    try { var f = req.session.user.user;    f = req.session.password;    } catch (error) {   return  res.redirect("../../../");  } 
     User.authenticateEncript(req.session.user.user, req.session.password, function (error, user) {
        if (error || !user) {                 
        } else {  
            try {  
                const data = JSON.parse(req.body.json);  
                for (var key in data)
                { 
                    var orden = data[key];  
                    console.log(orden); 
                    var objLmanufactura = new objManufactura( orden );   
                    objLmanufactura.create_by = user.id;
                    objLmanufactura.created_at = new Date(Date.now()); 
                    objLmanufactura.save(function(err){   
                        if( err ){ console.log('Error: ', err); }   
                    });      
                }    
                 return res.status(200).send("Correcto");
            } catch (error) {
                return res.status(500).send(error) ;
            } 
        }
    }); 
};


module.exports = order_manufac_Schema;