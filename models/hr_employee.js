const conexion = require("./conexion")
 module.exports = { 
    async obtener(filter) {   
        const query = `SELECT 
                            cpar.C_BPartner_ID,emp.name,emp.name2
                            ,emp.hr_employee_id ,HR_Job_ID,emp.ad_org_id
                            ,emp.IdentificationMark as identificationmark  
                        FROM adempiere.C_BPartner cpar    
                            INNER JOIN adempiere.HR_Employee emp ON emp.C_BPartner_ID = cpar.C_BPartner_ID  
                        WHERE   
                            emp.ad_org_id NOT IN (1000031,1000030,1000011)
                            AND emp.isactive='Y'
                            AND (CASE 
                                    WHEN 1000010 = ` + filter + `  THEN  
                                        emp.HR_Employee_id IN (1000114,1000152,1000234,1000358) 
                                    WHEN 1000007 = ` + filter + `  THEN  
                                        emp.ad_org_id = 1000007 
                                        AND HR_Department_ID = 1000013 
                                        AND HR_Job_ID IN (1000041) 
                                    ELSE  emp.ad_org_id = ` + filter + `
                                        AND HR_Department_ID = 1000013 
                                        AND HR_Job_ID IN (1000063) 
                                END);`; 
        const resultados = await conexion.query(query); 
        return resultados.rows;
    },
    async obtenerPorIds(ids) {
        const query = "SELECT cpar.C_BPartner_ID,emp.name,emp.name2,emp.hr_employee_id FROM adempiere.C_BPartner cpar " +
        " INNER JOIN adempiere.HR_Employee emp " +
         "ON emp.C_BPartner_ID = cpar.C_BPartner_ID " + 
         "WHERE emp.hr_employee_id IN (" + ids + " );";  
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
    
}