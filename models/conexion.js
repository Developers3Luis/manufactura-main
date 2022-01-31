const { Pool } = require("pg")
// Credenciales

// const pool = new Pool({
//     user: 'postgres',
//     host: '192.168.193.83',
//     database: 'rfhoods390',
//     password: '[rfhood.?/]',
//     port: 65432,
//     schema: 'adempiere',
// });
// module.exports = pool;
 


// const pool = new Pool({
//     user: 'postgres',
//     // host: '172.16.103.113',
//     host: 'pruebas.refividrio.com.mx',
//     database: 'Hoods300121',
//     password: '@d3mp13r3',
//     port: 55432,
//     schema: 'adempiere',
// });


const pool = new Pool({
    user: 'adempiere',
    // user: 'postgres',
    // host: '172.16.103.113',
    host: 'pruebas.refividrio.com.mx',
    // database: 'RFV03072021',
    database:'RFV14012022',
    //     database: 'Hoods300121',
    // password: '@d3mp13r3',
    password: '[rfhood_.?/]',
    // port: 5432,
    port:65432,
    schema: 'adempiere',
});
module.exports = pool; 