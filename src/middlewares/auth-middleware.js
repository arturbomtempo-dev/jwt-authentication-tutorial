const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const cookieToken = req.cookies?.token;

    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1];

    const token = cookieToken || headerToken;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
