let Pool = require('pg').Pool
/* node-postgres (pg) als package, um eine Verbindung zu Postgres herzustellen  */

const pool = new Pool({
    user: "postgres",
    password: "2601",
    host: "localhost",
    port: 5432,
    database: "adamsdb"
})

// WICHTIG: POOL MUSS ANGEPASST WERDEN

module.exports = pool

/* Pool Objekt wird als Modul exportiert, damit
andere Dateien darauf zugreifen können */