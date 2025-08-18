const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');

function authenticateToken(req, res, next) {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1];

    const token = cookieToken || headerToken;

    if (!token) {
        throw new AppError(401, 'Token não fornecido.');
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) {
            throw new AppError(403, 'Token inválido ou expirado.');
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
