const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'TravelBug',
    password: 'KeyinSem3!', 
    port: 5433, 
})

module.exports = pool; 