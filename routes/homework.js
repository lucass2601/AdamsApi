const pool = require('../db') // Datenbank Objekt wird importiert

const getAllHomework = async (req, res) => {
    const class_id = req.body.user.class_id
    pool.query(`SELECT homework.homework_id, homework.homework_title, homework.homework_description,
    homework.homework_date_due, homework.homework_created_at, homework.homework_created_by, homework.homework_last_edit_at, homework.homework_last_edit_by, classes.class_id, classes.class_name FROM homework
    INNER JOIN classes_exams ON classes_exams.exam_fid = homework.homework_id
    INNER JOIN classes ON classes.class_id = classes_exams.class_fid
    WHERE classes.class_id = $1;
     `, [class_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send({ status: 'success', data: results.rows })
    })
}

const getHomework = async (req, res) => {
    const class_id = req.body.user.class_id
    const homework_id = req.params.id
    pool.query(`SELECT homework.homework_id, homework.homework_title, homework.homework_description,
    homework.homework_date_due, homework.homework_created_at, homework.homework_created_by, homework.homework_last_edit_at, homework.homework_last_edit_by, classes.class_id, classes.class_name FROM homework
    INNER JOIN classes_exams ON classes_exams.exam_fid = homework.homework_id
    INNER JOIN classes ON classes.class_id = classes_exams.class_fid
     WHERE homework.homework_id = $1 AND classes.class_id = $2;
     `, [homework_id, class_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send(results.rows)
    })
}

const addHomework = async (req, res) => {
    const class_id = req.body.user.class_id
    const student_id = req.body.user.student_id
    const homework = req.body.homework

    if (homework) {
        pool.query(`INSERT INTO homework (homework_title, homework_description, homework_date_due, homework_created_by) 
        VALUES ($1, $2, $3, $4) RETURNING *;`, [homework.homework_title, homework.homework_description, homework.homework_date_due, student_id], (error, results) => {
            if (error)
                throw error
            pool.query(`INSERT INTO classes_homework (class_fid, homework_fid) 
            VALUES ($1, $2);`, [class_id, results.rows[0].homework_id], (sub_error) => {
                if (sub_error)
                    throw sub_error
                res.status(200).send(results.rows[0])
            })
        })
    }
}

const editHomework = async (req, res) => {
    const homework = req.body.homework
    const student_id = req.body.user.student_id

    pool.query(`UPDATE homework SET homework_title = $2, homework_description = $3, homework_date_due = $4, homework_last_edit_at = NOW(), homework_last_edit_by = $5
     WHERE homework_id = $1 RETURNING *;`, [homework.homework_id, homework.homework_title, homework.homework_description, homework.homework_date_due, student_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send(results.rows[0])
    })
}

const deleteHomework = async (req, res) => {
    const homework_id = req.body.homework_id
    pool.query('DELETE FROM homework WHERE homework_id = $1', [homework_id], (error, results) => {
        if (error)
            throw error
        pool.query('DELETE FROM classes_homework WHERE classes_homework.homework_fid = $1', [homework_id], (subError, subResults) => {
            if (subError)
                throw subError
            res.status(200).send('Eintrag wurde gelöscht.')
        })
    })
}
module.exports = {
    getAllHomework,
    getHomework,
    addHomework,
    editHomework,
    deleteHomework
}