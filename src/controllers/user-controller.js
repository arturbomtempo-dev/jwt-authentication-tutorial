function profile(req, res) {
    res.json({
        message: 'Área do usuário autenticado.',
        user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
        },
    });
}

function publicPage(_req, res) {
    res.json({
        message: 'Página pública: acesso livre.',
    });
}

module.exports = { profile, publicPage };
