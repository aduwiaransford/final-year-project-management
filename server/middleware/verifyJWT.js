const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization || req.headers.Authorization

    if (!auth?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = auth.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        req.user = decoded

        next()
    })
}

module.exports = verifyJWT