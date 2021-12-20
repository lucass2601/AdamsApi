const express = require('express')
const bodyParser = require('body-parser')
<<<<<<< HEAD
const cors = require('cors')
const jsonParser = bodyParser.json()

const app = express();
app.use(cors({ credentials: true, origin: true }))
=======
const cors = require('cors');
const jsonParser = bodyParser.json();

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}))
>>>>>>> emsbranch

const port = 3000

let students = require('./routes/students')
<<<<<<< HEAD
let untis = require('./routes/untis')

=======
>>>>>>> emsbranch
let authController = require('./controller/auth.controller')
let untisapi = require('./untisapi')
let authtoken = require('./api/authtoken')

app.get('/students', students.getStudents)
app.get('/students/:student_id', students.getStudentById)

<<<<<<< HEAD
app.post('/timetable', jsonParser, untis.getTimetable)

=======
// Login Datenbank abfragen
>>>>>>> emsbranch
app.post('/signin', jsonParser, authController.signin)
// verifiziert token und wandelt token in json um
app.get('/posts', authtoken.authentificateToken)
//generiert neuen token mit refreshtoken
app.post('/token', jsonParser, authtoken.tokenrenew)

app.get('/untis', untisapi.untis)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})