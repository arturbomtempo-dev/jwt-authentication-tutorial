function dashboard(req, res) {
    res.json({
        message: `Dashboard admin - bem-vindo, ${req.user.username}`,
        role: req.user.role,
    });
}

module.exports = { dashboard };
