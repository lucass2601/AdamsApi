require('dotenv').config();
const pool = require('../db') // Datenbank Objekt wird importiert
const genToken = require('../api/authtoken');

// Login system, generiert JWT Token
const signin = async (req, res) => {
    let username = req.body.username;
    let keys = req.body.keys;
    if (username && keys) {
        await pool.query(`SELECT students.student_id, students.username, classes.title FROM students INNER JOIN classes ON students.class_fid = classes.class_id WHERE username = $1 AND keys = $2`, [username, keys], (error, results) => {
            if(error){
                throw error
            }
            if (results.rowCount > 0) {
                //Informationen von den User aus der Datenabnk holen und token übergeben
                const ids = results.rows[0].student_id;
                const user = results.rows[0].username;
                const userclass = results.rows[0].title;

                // Token generieren
                const token = genToken.generateAccessToken(user, ids, userclass);
                // Refresh Token generieren
                const refreshtoken = genToken.refreshToken(user, ids, userclass);

                genToken.sendTokenToDatabase(refreshtoken);
                
                
                // Token und Refreshtoken übergeben
                res.json({Accesstoken : token, RefreshToken: refreshtoken});
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
    
        })
    }    
}

module.exports = {
    signin
}