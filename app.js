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

let untisApi = require('./routes/untis')

let authToken = require('./api/authtoken')

// Login Datenbank abfragen
app.post('/signin', jsonParser, authController.signin)
// verifiziert token und wandelt token in json um
app.get('/posts', authToken.authenticateToken)
//generiert neuen token mit refreshtoken
app.post('/token', jsonParser, authToken.renewToken)

app.get('/untis', untisApi.getTimetable)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})