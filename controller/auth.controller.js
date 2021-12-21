require('dotenv').config();
const pool = require('../db') // Datenbank Objekt wird importiert
const token = require('../api/authtoken');

// Login system, generiert JWT Token
const signin = async (req, res) => {
    let username = req.body.username;
    let key = req.body.key;
    if (username && key) {
        await pool.query(`SELECT students.student_id, students.first_name, students.last_name, students.username, students.class_fid, classes.class_name FROM students INNER JOIN classes ON students.class_fid = classes.class_id WHERE username = $1 AND key = $2`, [username, key], (error, results) => {
            if (error) {
                throw error
            }
            if (results.rowCount > 0) {
                //Informationen von den User aus der Datenabnk holen und token übergeben
                const user = {
                    student_id: results.rows[0].student_id,
                    first_name: results.rows[0].first_name,
                    last_name: results.rows[0].last_name,
                    username: results.rows[0].username,
                    class_id: results.rows[0].class_fid,
                    class_name: results.rows[0].class_name,
                }

                // Token generieren
                const accessToken = token.generateAccessToken(user);
                // Refresh Token generieren
                const refreshToken = token.refreshToken(user);

                token.sendTokenToDatabase(refreshToken);


                // accessToken und refreshToken übergeben
                res.json({ status: 'success', message: 'Erfolgreich eingeloggt', accessToken, refreshToken });
            } else {
                res.json({ status: 'error', message: 'Falscher Username/Passwort!' });
            }
            res.end();

        })
    } else {
        res.json({ status: 'error', message: 'Leere Datensätze' })
    }
}

module.exports = {
    signin
}