const pool = require("../db");

const getAppointments = async (req, res) => {
    let student_id = req.body.user.student_id;

    pool.query("SELECT * FROM appointments WHERE appointment_created_by = ('"+student_id+"')", (err, result) => {
        if(err) res.sendStatus(403);
        res.send(result.rows);
    })
}

const addAppointment = async (req,res) => {
    const student_id = req.body.user.student_id;
    const appointment = req.body.appointment;

    if(appointment){
        pool.query("INSERT INTO appointments (apoointment_title,appointment_description,appointment_date,appointment_created_at,appointment_created_by) VALUES RETURNING *;", 
        [appointment.appointment_title, appointment.appointment_description,appointment.appointment_date,appointment.cappointment_reated_at,student_id], (err,result) => {
            if(err){
                throw err
            }
            res.sendStatus(200).send(result.rows[0]);
        })
    }
}

const editAppointment = async (req, res) => {
    const student_id = req.body.user
    const appointment = req.body.appointment

    if(appointment){
        pool.query("UPDATE appointments SET appointment_title = $2, appointment_description = $3, appointment_date = $4, appointment_last_edit_at = $5, appointment_last_edit_by WHERE appointment_id =$1 RETURNING *;", 
        [appointment.appointment_id,appointment.appointment_tile,appointment.appointment_description,appointment.appointment_date,appointment.appointment_last_edit_at,student_id],
        (err, result) => {
            if(err){
                throw err;
            }
            res.sendStatus(200).send(result.rows[0]);
        })
    }
}


const delteAppointment = async (req, res) => {
    const appointment = req.body.appointment

    if(appointment){
        pool.query("DELETE FROM appointments WHERE appointment_id = ('"+appointment.appointment_id+"')", (err) => {
            if(err) return res.sendStatus(300)
            res.sendStatus(200).send("Termin wurde gelöscht");
        })
    }
}

module.exports = {
    getAppointments,
    addAppointment,
    editAppointment,
    delteAppointment
}