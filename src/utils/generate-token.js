const jwt = require('jsonwebtoken');

function generateToken(payload) {
    const secret = process.env.JWT_SECRET || 'secret';
    return jwt.sign({ id: payload.id, username: payload.username, role: payload.role }, secret, {
        expiresIn: '1h',
    });
}

module.exports = { generateToken };
