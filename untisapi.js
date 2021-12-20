
// Webuntis API
const Webuntis = require('webuntis');
const untisapi = new Webuntis('ajc-bk-ratingen', '_schueler', 'AjcBK125', 'neilo.webuntis.com');

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1);

const untis = async (req, res) => {
    untisapi
        .login()
        .then(() => {
            /* return untisapi.getTimetableForToday(770,1); */
            /* return untisapi.getTimetableFor(today, 770, 1); */
            return untisapi.getTimegrid();
        })
        .then((timetable) => {
            console.log(timetable);
        })
}

module.exports = {
    untis
}
