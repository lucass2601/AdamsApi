let Pool = require('pg').Pool
/* node-postgres (pg) als package, um eine Verbindung zu Postgres herzustellen  */

const pool = new Pool({
    user: "emp",
    password: "postgres_pass",
    host: "192.168.178.62",
    port: 5001,
    database: "emp"
})

// WICHTIG: POOL MUSS ANGEPASST WERDEN

module.exports = pool

/* Pool Objekt wird als Modul exportiert, damit
andere Dateien darauf zugreifen können */