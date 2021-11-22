const express = require('express')
const app = express();

const port = 3000

let students = require('./routes/students')

app.get('/students', students.getStudents)
app.get('/students/:student_id', students.getStudentById)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})