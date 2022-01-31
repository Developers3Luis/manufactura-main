const conexion = require("./conexion")
module.exports = { 
        async insertarOrdenAD(qryt) { 
        await conexion.query("SET search_path to adempiere;");  
        const query = "SELECT " + qryt ; 
        console.log(query);  
        let resultados = await conexion.query(query);  
        return resultados.rows;
    },


    async obtener() {
        const resultados = await conexion.query("SELECT m_product_id,value, description,name FROM adempiere.m_product  WHERE IsBOM = 'Y' AND isVerified = 'Y'  AND isActive = 'Y' AND ad_client_id = '1000000'  ORDER BY value --OR value LIKE '%P05FR000%' ");
        return resultados.rows;
    }, 
}