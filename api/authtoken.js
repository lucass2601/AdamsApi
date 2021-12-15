const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_decode = require('jwt-decode');

// Macht neuen Access Token für User
function generateAccessToken(username, student_id, student_class) {
    const user = {name: username, id: student_id, class: student_class}
    return jwt.sign(user, process.env.TOKEN_SECRET/* , { expiresIn: '10min' } */);
}

// Holt sich den Token vom Frontend 
function authentificateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        res.status(200).send(parseJwt(token));
        next()
    })
}

// wandelt den Token in JSON um
function parseJwt(token){
    try{
        const decodeToken = jwt_decode(token);
        return decodeToken;
    }catch(e){
        return null;
    }
}

module.exports = {
    generateAccessToken,
    authentificateToken,
    parseJwt
}