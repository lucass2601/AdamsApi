const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const pool = require('../db')
require('dotenv').config();

// Macht neuen Access Token für User, dieser Token läuft ab 
function generateAccessToken(username, student_id, student_class) {
    const user = {name: username, id: student_id, class: student_class}
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '20min' });
}
// 
function refreshToken(username, student_id, student_class) {
    const user = {name: username, id: student_id, class: student_class}
    const genrefreshtoken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    return genrefreshtoken
}

// Holt sich den Token vom Frontend 
function authentificateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    // Der Token wird verifiziert
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        res.status(200).send(user)
        next()
    })
}
 
// Durch die Informationen vom RefreshToken wird ein neuer token erstellt
function tokenrenew(req, res){
    const newToken = req.body.token
    if (newToken == null) return res.sendStatus(401)
    jwt.verify(newToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        pool.query("SELECT * FROM refresh_token WHERE token = ('"+newToken+"')", (err, result) => {
            if(err) return res.sendStatus(403)
            if(result.rowCount > 0){
                const token = generateAccessToken(user.name,user.id,user.class)
                res.json({AccessToken : token})
            }
        })
    })
}

// Beim einloggen wird diese Fuktion aufgerufen und speichert den refreshToken in der Datenbank
function sendTokenToDatabase(sendToken){
    jwt.verify(sendToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        var userid = user.id
        pool.query("INSERT INTO refresh_token (token,student_id) VALUES ('"+sendToken+"','"+userid+"')")
    })
}

// Beim Logout soll der refreshToken von der Datenbank gelöscht werden
function deleteTokenFromDatabase(delToken){
    jwt.verify(delToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        var userid = user.id
        pool.query("DELETE FROM refresh_token WHERE student_id = ('"+ userid+"')")
    })
}

module.exports = {
    generateAccessToken,
    authentificateToken,
    refreshToken,
    tokenrenew,
    sendTokenToDatabase,
    deleteTokenFromDatabase
}