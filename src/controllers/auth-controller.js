const bcrypt = require('bcrypt');
const { registerSchema, loginSchema } = require('../utils/user-validation');
const { createUser, findByEmail, findByUsername } = require('../repositories/user-repository');
const { generateToken } = require('../utils/generate-token');

async function register(req, res) {
    try {
        const parsed = registerSchema.parse(req.body);

        const emailExists = await findByEmail(parsed.email);

        if (emailExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const usernameExists = await findByUsername(parsed.username);

        if (usernameExists) {
            return res.status(400).json({ error: 'Username já cadastrado' });
        }

        const hashed = await bcrypt.hash(parsed.password, 10);

        const userToInsert = {
            email: parsed.email,
            username: parsed.username,
            password: hashed,
            role: parsed.role,
        };

        const created = await createUser(userToInsert);

        return res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: created,
        });
    } catch (err) {
        if (err.errors) {
            return res.status(400).json({ error: err.errors });
        }

        return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
}

async function login(req, res) {
    try {
        const parsed = loginSchema.parse(req.body);
        let user = null;

        if (parsed.email) {
            user = await findByEmail(parsed.email);
        }

        if (!user && parsed.username) {
            user = await findByUsername(parsed.username);
        }

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const ok = await bcrypt.compare(parsed.password, user.password);

        if (!ok) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role });

        return res.json({ message: 'Login realizado com sucesso', token });
    } catch (err) {
        if (err.errors) {
            return res.status(400).json({ error: err.errors });
        }

        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
}

module.exports = { register, login };
