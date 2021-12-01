const pool = require('../db') // Datenbank Objekt wird importiert

const signin = async (req, res) => {
    let username = req.body.username;
    let key = req.body.key;

    console.log(req.body);
    if (username && key) {
        const findStudent = await pool.query(`SELECT student_id, first_name, last_name, title FROM students INNER JOIN classes ON classes.class_id = students.class_fid WHERE username = $1 AND key = $2`, [username, key])
        if (findStudent.rowCount > 0) {
            res.status(200).send({
                status: 'success',
                message: 'Erfolgreich eingeloggt.',
                user: findStudent.rows
            })
        } else {
            res.status(200).send({
                status: 'error',
                message: 'Falscher Username/Schlüssel.',
            })
        }
        res.end();
    } else {
        res.status(200).send({
            status: 'error',
            message: 'Bitte Username und Schlüssel angeben.',
        })
        res.end();
    }
}

module.exports = {
    signin
}