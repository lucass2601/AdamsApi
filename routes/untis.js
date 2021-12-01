const pool = require('../db') // Datenbank Objekt wird importiert

const WebUntisLib = require('webuntis')

const getTimetable = async (req, res) => {
    let untis = new WebUntisLib('ajc-bk-ratingen', '_schueler', 'AjcBK125', 'neilo.webuntis.com');

    let student_class = req.body.class

    untis
        .login()
        .then(() => {
            return untis.getClasses()
        })
        .then((classes) => {
            return classes.find(x => x.name.toLowerCase() == student_class).id
        })
        .then((id) => {
            return untis.getTimetableForRange(new Date('2021-11-29'), new Date('2021-12-03'), id, 1);
        })
        .then((timetable) => {
            res.status(200).send({
                data: timetable
            })
        });
}
module.exports = {
    getTimetable
}