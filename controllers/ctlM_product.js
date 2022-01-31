const express = require('express');
const router = express.Router();

const productosModel = require("../models/m_product");

router.get('/', function (req, res, next) {
    productosModel
        .obtener()
        .then(productos => {
            console.log(productos); 
            res.render('../views/product/index', {productos: productos} );
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send("Error obteniendo productos");
        }); 
}); 
module.exports = router;