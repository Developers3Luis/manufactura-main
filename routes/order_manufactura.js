var express = require('express');
var router = express.Router(); 
var ctlOrderManufacture = require('../controllers/ctlOrderManufacture.js');
 
    router.get('/', ctlOrderManufacture.list);
    router.get('/show/:id', ctlOrderManufacture.show);
    router.get('/create', ctlOrderManufacture.create);
    router.post('/save', ctlOrderManufacture.save);
    router.post('/saveGrilla', ctlOrderManufacture.saveGrilla);

    router.get('/edit/:id', ctlOrderManufacture.edit);
    router.post('/update/:id', ctlOrderManufacture.update);
    router.post('/delete/:id', ctlOrderManufacture.delete);
    router.get('/Sincronizar/:id', ctlOrderManufacture.sincAD);
    router.post('/filterProduct/', ctlOrderManufacture.filterProduct);
    router.get('/grilla/', ctlOrderManufacture.grilla);
    router.post('/saveAndSinc/', ctlOrderManufacture.saveAndSinc); 
    router.post('/obtenerMoldes/', ctlOrderManufacture.obtenerMoldes);
module.exports = router;