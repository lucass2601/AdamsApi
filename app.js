const express = require('express')
const app = express();

const port = 3000

const pool = require('./db') // Datenbank Objekt wird importiert

app.get('/students', async (req, res) => {
    try {
        const allStudents = await pool.query
            ("SELECT student_id, first_name, last_name, title FROM students INNER JOIN classes ON classes.class_id = students.class_fid")
        res.json(allStudents.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})