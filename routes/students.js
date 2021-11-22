const pool = require('../db') // Datenbank Objekt wird importiert

const getStudents = async (req, res) => {
    try {
        const allStudents = await pool.query
            ("SELECT student_id, first_name, last_name, title FROM students INNER JOIN classes ON classes.class_id = students.class_fid")
        res.json(allStudents.rows)
    } catch (err) {
        console.log(err.message)
    }
}

const getStudentById = async (req, res) => {
    try {
        const studentById = await pool.query
            (`SELECT * FROM students WHERE student_id = ${req.params.student_id}`)
        res.json(studentById.rows)
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getStudents,
    getStudentById
}