function dashboard(req, res) {
    res.status(200).json({
        status: 200,
        message: `Dashboard do admin - bem-vindo, ${req.user.username}`,
        role: req.user.role,
    });
}

module.exports = { dashboard };
