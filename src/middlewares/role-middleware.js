const { AppError } = require('../utils/error-handler');

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            throw new AppError(403, 'Acesso negado: permissões insuficientes.');
        }

        next();
    };
}

module.exports = { authorizeRoles };
