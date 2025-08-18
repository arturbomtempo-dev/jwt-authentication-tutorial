const express = require('express');
const { dashboard } = require('../controllers/admin-controller');
const { authenticateToken } = require('../middlewares/auth-middleware');
const { authorizeRoles } = require('../middlewares/role-middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints acessíveis apenas a administradores
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Acessar o dashboard do admin
 *     description: Retorna uma mensagem simulando o dashboard. Apenas usuários autenticados com a role "admin" podem acessar.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard acessado com sucesso
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
 *                   example: "Dashboard do admin - bem-vindo, AdminUser"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       401:
 *         description: Não autenticado – token ausente
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Erro interno do servidor"
 */
router.get('/dashboard', authenticateToken, authorizeRoles('admin'), dashboard);

module.exports = router;
