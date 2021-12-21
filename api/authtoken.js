const jwt = require('jsonwebtoken');
const pool = require('../db')
require('dotenv').config();

// Macht neuen Access Token für User, dieser Token läuft ab 
function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '30m' });
}
// 
function refreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    return refreshToken
}

// Holt sich den Token vom Frontend 
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    // Der Token wird verifiziert
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(401)
        } else {
            req.body['user'] = user
            /* res.status(200).send({ status: 'success', user: { student_id: user.student_id, first_name: user.first_name, last_name: user.last_name, username: user.username, class_name: user.class_name, } }) */
            next()
        }
    })
}

// Durch die Informationen vom RefreshToken wird ein neuer token erstellt
function renewToken(req, res) {
    const newToken = req.body.refreshToken
    if (newToken == null) return res.sendStatus(401)
    jwt.verify(newToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        pool.query("SELECT * FROM refresh_token WHERE token = ('" + newToken + "')", (err, result) => {
            if (err) return res.sendStatus(403)
            if (result.rowCount > 0) {
                let accessToken = generateAccessToken(user)
                res.status(200).send({ status: 'success', accessToken })
            }
        })
    })
}

// Beim einloggen wird diese Fuktion aufgerufen und speichert den refreshToken in der Datenbank
function sendTokenToDatabase(sendToken) {
    jwt.verify(sendToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        let user_id = user.student_id
        pool.query("INSERT INTO refresh_token (token, student_fid) VALUES ('" + sendToken + "','" + user_id + "')")
    })
}

// Beim Logout soll der refreshToken von der Datenbank gelöscht werden
function deleteTokenFromDatabase(delToken) {
    jwt.verify(delToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        var userid = user.id
        pool.query("DELETE FROM refresh_token WHERE student_fid = ('" + userid + "')")
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    refreshToken,
    renewToken,
    sendTokenToDatabase,
    deleteTokenFromDatabase
}