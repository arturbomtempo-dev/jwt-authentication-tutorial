function profile(req, res) {
    res.status(200).json({
        status: 200,
        message: 'Perfil do usuário autenticado.',
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
        },
    });
}

function publicPage(_req, res) {
    res.status(200).json({
        status: 200,
        message: 'Página pública: acesso livre.',
    });
}

module.exports = { profile, publicPage };
