function authorizeRoles(...allowed) {
    return (req, res, next) => {
        if (!req.user || !allowed.includes(req.user.role)) {
            throw new AppError(401, 'Acesso negado.');
        }

        next();
    };
}

module.exports = { authorizeRoles };
