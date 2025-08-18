const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { registerSchema, loginSchema } = require('../utils/user-validation');
const { createUser, findByEmail, findByUsername } = require('../repositories/user-repository');
const { generateToken } = require('../utils/generate-token');
const { AppError } = require('../utils/errorHandler');

async function register(req, res, next) {
    try {
        const parsed = registerSchema.parse(req.body);
        const emailExists = await findByEmail(parsed.email);

        if (emailExists) {
            throw new AppError(400, 'E-mail já cadastrado.');
        }

        const usernameExists = await findByUsername(parsed.username);

        if (usernameExists) {
            throw new AppError(400, 'Username já cadastrado.');
        }

        const hashed = await bcrypt.hash(parsed.password, 10);

        const userToInsert = {
            id: uuid(),
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
        if (err instanceof AppError) {
            return next(err);
        }

        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.errors.map((e) => e.message).join(', ')));
        }

        return next(new AppError(500, 'Erro ao registrar usuário.'));
    }
}

async function login(req, res, next) {
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
            throw new AppError(401, 'Credenciais inválidas.');
        }

        const ok = await bcrypt.compare(parsed.password, user.password);

        if (!ok) {
            throw new AppError(401, 'Credenciais inválidas.');
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/',
        });

        return res.json({
            message: 'Login realizado com sucesso',
            token,
        });
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }

        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.errors.map((e) => e.message).join(', ')));
        }

        return next(new AppError(500, 'Erro ao realizar login.'));
    }
}

function logout(_req, res) {
    res.clearCookie('token', { path: '/' });
    return res.json({
        message: 'Logout efetuado',
    });
}

module.exports = { register, login, logout };
