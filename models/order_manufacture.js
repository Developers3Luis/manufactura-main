var mongoose = require('mongoose'); 
var bcrypt = require('bcrypt');

var order_manufac_Schema = new mongoose.Schema({
    m_product_id: {type: Number, required: true,trim: true},
    ad_org_id: {type: Number, required: true,trim: true},
    m_warehouse_id: {type: Number, required: true,trim: true},
    cantidad: {type: Number, required: true,trim: true}, 
    sincronizado: {type: Boolean, required: true, default:false},
    orden_ad: {type: String, default:"",trim: true}, 
    hr_employe_id: {type: Number, required: true,trim: true},
    update_by: { type: String, default: "" }, 
    update_at: { type: Date, default: "" },
    create_by: { type: String, default: ""},
    created_at: { type: Date, default: Date.now },
    sinc_with_ad: { type: Date, default: "" },
    rf_id_molde_id: {type: Number, required: true,trim: true},
}); 
 
var order_manufac = mongoose.model('order_manufac', order_manufac_Schema);
module.exports = order_manufac; 



//hashing a password before saving it to the database
order_manufac_Schema.pre('save', function (next) {
    var order_manufac = this;  
    order_manufac.created_at =  new Date(Date.now());
}); 