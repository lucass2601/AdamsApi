require('dotenv').config();
const pool = require('../db') // Datenbank Objekt wird importiert
let genToken = require('../api/authtoken');


const signin = async (req, res) => {
    let username = req.body.username;
    let keys = req.body.keys;
    if (username && keys) {
        const findStudent = await pool.query(`SELECT * FROM students WHERE username = $1 AND keys = $2`, [username, keys])
        if (findStudent.rowCount > 0) {
            // Generating token
            const token = genToken.generateAccessToken(username, 1)
            res.json(token);

        } else {
            res.send('Incorrect Username and/or Password!');
        }
        res.end();

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}

module.exports = {
    signin
}