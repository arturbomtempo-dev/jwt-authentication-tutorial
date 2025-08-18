const express = require('express');
const { profile, publicPage } = require('../controllers/user-controller');
const { authenticateToken } = require('../middlewares/auth-middleware');
const { authorizeRoles } = require('../middlewares/role-middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para usuários gerais e acesso público
 */

/**
 * @swagger
 * /user/public:
 *   get:
 *     summary: Acessar página pública
 *     description: Retorna uma mensagem pública que pode ser acessada por qualquer pessoa, sem autenticação.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Página pública acessada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Página pública: acesso livre."
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/public', publicPage);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Acessar perfil do usuário
 *     description: Retorna informações do perfil do usuário autenticado. Apenas usuários logados com role "user" ou "admin" podem acessar.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Perfil do usuário autenticado."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid-do-usuario"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Não autenticado – token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Token não fornecido."
 *       403:
 *         description: Proibido – sem permissão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Acesso negado: permissões insuficientes."
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/profile', authenticateToken, authorizeRoles('user', 'admin'), profile);

module.exports = router;
