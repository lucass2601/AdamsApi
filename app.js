const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonParser = bodyParser.json()

const app = express();
app.use(cors({ credentials: true, origin: true }))

const port = 3000

let students = require('./routes/students')

let authController = require('./controller/auth.controller')

app.get('/students', students.getStudents)
app.get('/students/:student_id', students.getStudentById)

app.post('/signin', jsonParser, authController.signin)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})