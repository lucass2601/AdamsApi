let Pool = require('pg').Pool
/* node-postgres (pg) als package, um eine Verbindung zu Postgres herzustellen  */

const pool = new Pool({
    user: "adamsapp",
    password: "B7kaHb,JE{gL$?:",
    host: "5.230.68.246",
    port: 5432,
    database: "adamsapp"
})

module.exports = pool

/* Pool Objekt wird als Modul exportiert, damit
andere Dateien darauf zugreifen können */