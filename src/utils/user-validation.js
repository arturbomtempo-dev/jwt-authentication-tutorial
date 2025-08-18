const { z } = require('zod');

const registerSchema = z.object({
    email: z.email('Email inválido.'),
    username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres.'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
    role: z.enum(['user', 'admin']).default('user'),
});

const loginSchema = z
    .object({
        email: z.email('Email inválido.').optional(),
        username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres.').optional(),
        password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
    })
    .refine((data) => data.email || data.username, {
        message: 'Forneça email ou username para login.',
        path: ['email'],
    });

module.exports = { registerSchema, loginSchema };
