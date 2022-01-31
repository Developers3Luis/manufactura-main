const conexion = require("./conexion")
 module.exports = {
//     async insertar(nombre, precio) {
//         let resultados = await conexion.query('insert into productos
//         (nombre, precio)
//         values
//         ($1, $2)', [nombre, precio]);
//         return resultados;
//     },
    async obtener(filter) {
        const query = `SELECT p.m_product_id,p.value, p.description,name 
                        FROM adempiere.m_product  as p
                        INNER JOIN adempiere.PP_Product_Planning pp  
                         ON pp.M_Product_ID = p.M_Product_ID  
                         AND pp.AD_Workflow_ID  IS NOT null 
                         AND pp.S_Resource_ID IS NOT null 
                         WHERE p.IsBOM = 'Y' AND p.isVerified = 'Y' AND p.isActive = 'Y' AND p.ad_client_id = '1000000' 
                         AND pp.ad_org_id =` + filter + ` 
                         AND p.C_UOM_ID <> 1000017
                         ORDER BY value`; 
        //   console.log(query);
        const resultados = await conexion.query(query); 
        return resultados.rows;
    },
    async obtenerMoldes(filter) {
        const query =`  SELECT 
                            DocumentNo,
                            rf_id_molde_id,
                            documentNo
                            ,COALESCE(description,'') As description 
                        FROM adempiere.rF_ID_Molde 
                        WHERE M_Product_ID = ` + filter + ` ORDER BY DocumentNo`; 
                        // console.log(resultados);
        const resultados = await conexion.query(query); 
        return resultados.rows;
    },
    async obtenerPorId(id) { 
 
        const resultados = await conexion.query("SELECT * FROM adempiere.m_product  WHERE IsBOM = 'Y' AND isVerified = 'Y' AND isActive = 'Y' AND ad_client_id = '1000000' WHERE m_product = $1", [id]);
        return resultados.rows[0];
    },
    async obtenerPorNombre(nombre) {
        const resultados = await conexion.query("SELECT * FROM adempiere.m_product  WHERE IsBOM = 'Y' AND isVerified = 'Y' AND isActive = 'Y' AND ad_client_id = '1000000' WHERE name LIKE '%$1%' ", [nombre]);
        return resultados.rows[0];
    },
    async obtenerPorValue(value) {
        const resultados = await conexion.query("SELECT * FROM adempiere.m_product  WHERE IsBOM = 'Y' AND isVerified = 'Y' AND isActive = 'Y' AND ad_client_id = '1000000' WHERE value LIKE '%$1%' ", [value]);
        return resultados.rows[0];
    },
    async obtenerPorIds(ids) {
        const query = "SELECT name, value,description,m_product_id FROM adempiere.m_product  WHERE IsBOM = 'Y' AND isVerified = 'Y' AND isActive = 'Y' AND ad_client_id = '1000000' AND m_product_id IN (" + ids + ")"; 
        // console.log(query);
        const resultados = await conexion.query(query ); 
        return resultados.rows;
    },
    // async actualizar(id, nombre, precio) {
    //     const resultados = conexion.query(update productos
    //     set nombre = $1,
    //     precio = $2
    //     where id = $3`, [nombre, precio, id]);
    //     return resultados;
    // },
    // async eliminar(id) {
    //     const resultados = conexion.query(`delete from productos
    //     where id = $1`, [id]);
    //     return resultados;
    // },
}