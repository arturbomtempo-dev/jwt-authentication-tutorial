function authorizeRoles(...allowed) {
    return (req, res, next) => {
        if (!req.user || !allowed.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        
        next();
    };
}

module.exports = { authorizeRoles };
