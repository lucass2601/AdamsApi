const pool = require('../db') // Datenbank Objekt wird importiert

const signin = async (req, res) => {
    let username = req.body.username;
    let key = req.body.key;
    if (username && key) {
        const findStudent = await pool.query(`SELECT * FROM students WHERE username = $1 AND key = $2`, [username, key])
        if (findStudent.rowCount > 0) {
            res.send('User exists')
        } else {
            res.send('Incorrect Username and/or Password!');
        }
        res.end();

    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}

module.exports = {
    signin
}