const conexion = require("./conexion")
module.exports = { 
    async obtener(id_us_ad) { 
        // var id_us_ad = "1001489";
        if (id_us_ad == "Admin") {
            id_us_ad = "AD_User_ID" 
        }
        const query = "SELECT ad_org_id,name FROM adempiere.ad_org  WHERE  ad_client_id = 1000000 " +		
        "AND ad_org_id IN (1000002,1000008,1000009,1000010,1000011,1000031,1000030,1000007)" +
        "AND ad_org_id IN (SELECT ad_org_id FROM adempiere.AD_User_OrgAccess WHERE AD_User_ID=" + id_us_ad + " AND isActive = 'Y' AND isReadonly = 'N')	" +		 
        "ORDER BY Value ";
        const resultados = await conexion.query(query);
        // console.log(query); 
        return resultados.rows;
    }, 

    async obteneralmacenes(filter) {
        const query = "SELECT value,name,m_warehouse_id FROM adempiere.M_Warehouse WHERE isActive = 'Y' AND  ad_org_id =" + filter;
     
        const resultados = await conexion.query(query);
        
        return resultados.rows;
    }, 

    
}