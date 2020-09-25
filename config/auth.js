const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
    let token = req.get('Authorization') || req.body.token || req.query.token
    if (token) {
        token = token.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {next(err)}
            else {
                req.user = decoded.user
                next()
            }
        })
    } else {
        next()
    }
}