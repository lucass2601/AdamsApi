const pool = require('../db') // Datenbank Objekt wird importiert

const getAllExams = async (req, res) => {
    const class_id = req.body.user.class_id
    pool.query(`SELECT exams.exam_id, exams.exam_title, exams.exam_description,
     exams.exam_date, exams.exam_created_at, exams.exam_created_by, exams.exam_last_edit_at, exams.exam_last_edit_by, classes.class_id, classes.class_name FROM exams
     INNER JOIN classes_exams ON classes_exams.exam_fid = exams.exam_id
     INNER JOIN classes ON classes.class_id = classes_exams.class_fid
     WHERE classes.class_id = $1;
     `, [class_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send(results.rows)
    })

}

const getExam = async (req, res) => {
    const class_id = req.body.user.class_id
    const exam_id = req.params.id
    pool.query(`SELECT exams.exam_id, exams.exam_title, exams.exam_description,
    exams.exam_date, exams.exam_created_at, exams.exam_created_by, exams.exam_last_edit_at, exams.exam_last_edit_by, classes.class_id, classes.class_name FROM exams
    INNER JOIN classes_exams ON classes_exams.exam_fid = exams.exam_id
    INNER JOIN classes ON classes.class_id = classes_exams.class_fid
     WHERE exams.exam_id = $1 AND classes.class_id = $2;
     `, [exam_id, class_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send(results.rows)
    })
}

const addExam = async (req, res) => {
    const class_id = req.body.user.class_id
    const student_id = req.body.user.student_id
    const exam = req.body.exam

    if (exam) {
        pool.query(`INSERT INTO exams (exam_title, exam_description, exam_date, exam_created_by) 
            VALUES ($1, $2, $3, $4) RETURNING *;`, [exam.exam_title, exam.exam_description, exam.exam_date, student_id], (error, results) => {
            if (error)
                throw error
            pool.query(`INSERT INTO classes_exams (class_fid, exam_fid) 
                VALUES ($1, $2);`, [class_id, results.rows[0].exam_id], (sub_error) => {
                if (sub_error)
                    throw sub_error
                res.status(200).send(results.rows[0])
            })
        })

    }
}

const editExam = async (req, res) => {
    let student_id = req.body.user.student_id
    const exam = req.body.exam

    pool.query(`UPDATE exams SET exam_title = $2, exam_description = $3, exam_date = $4, exam_last_edit_at = NOW(), exam_last_edit_by = $5
     WHERE exam_id = $1 RETURNING *;`, [exam.exam_id, exam.exam_title, exam.exam_description, exam.exam_date, student_id], (error, results) => {
        if (error)
            throw error
        res.status(200).send(results.rows[0])
    })
}

const deleteExam = async (req, res) => {
    const exam_id = req.body.exam_id
    pool.query('DELETE FROM exams WHERE exam_id = $1', [exam_id], (error, results) => {
        if (error)
            throw error
        pool.query('DELETE FROM classes_exams WHERE classes_exams.exam_fid = $1', [exam_id], (subError, subResults) => {
            if (subError)
                throw subError
            res.status(200).send('Eintrag wurde gelöscht.')
        })
    })
}
module.exports = {
    getAllExams,
    getExam,
    addExam,
    editExam,
    deleteExam
}