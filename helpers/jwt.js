const jwt = require('jsonwebtoken');

exports.generateAccessToken = (username) => {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

