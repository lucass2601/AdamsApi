const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const jsonParser = bodyParser.json();

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}))

const port = 3000

let authController = require('./controller/auth.controller')

let homework = require('./routes/homework')
let exams = require('./routes/exams')
let untisApi = require('./routes/untis')

let authToken = require('./api/authtoken')

// Login des Users
app.post('/signin', jsonParser, authController.signin)
// Generiert neuen Token durch refreshToken
app.post('/token', jsonParser, authToken.renewToken)

// ROUTEN:
app.get('/homework', jsonParser, authToken.authenticateToken, homework.getAllHomework)
app.get('/homework/:id', jsonParser, authToken.authenticateToken, homework.getHomework)
app.post('/homework', jsonParser, authToken.authenticateToken, homework.addHomework)
app.put('/homework', jsonParser, authToken.authenticateToken, homework.editHomework)
app.delete('/homework', jsonParser, authToken.authenticateToken, homework.deleteHomework)

app.get('/exams', jsonParser, authToken.authenticateToken, exams.getAllExams)
app.get('/exams/:id', jsonParser, authToken.authenticateToken, exams.getExam)
app.post('/exams', jsonParser, authToken.authenticateToken, exams.addExam)
app.put('/exams', jsonParser, authToken.authenticateToken, exams.editExam)
app.delete('/exams', jsonParser, authToken.authenticateToken, exams.deleteExam)

app.get('/untis', jsonParser, authToken.authenticateToken, untisApi.getTimetable)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})