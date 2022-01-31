const conexion = require("./conexion")
 module.exports = { 
    async obtener() {
        const query = "SELECT " +
                            "usr.value,usr.email,usr.AD_User_ID,usr.name,partner.name,partner.name2 " +
                            "FROM adempiere.C_BPartner partner " + 
                            " INNER JOIN adempiere.AD_User usr ON partner.C_BPartner_ID = usr.C_BPartner_ID" +
                            " INNER JOIN adempiere.AD_User_Roles roles ON roles.AD_User_ID = usr.AD_User_ID" +
                            "  WHERE" +
                            "  C_BP_group_id = 1000002  " +
                            "  AND usr.isActive = 'Y'" +
                            "  AND usr.AD_client_id = 1000000" +
                            "  AND roles.AD_Role_ID  " +
                            "  IN (1000055,1000011,1000057,1000047,1000010,1000051,1000041,1000000)"; 
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