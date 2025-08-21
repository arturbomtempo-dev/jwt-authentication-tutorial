const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/db');

jest.setTimeout(20000);

describe('Auth & DB integration tests', () => {
    const testUser = {
        email: 'ci-test@example.com',
        username: 'ci_test_user',
        password: 'TestPassword123!',
    };

    beforeAll(async () => {
        await db.migrate.latest();
    });

    beforeEach(async () => {
        await db('users').del();
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('migrations created users table', async () => {
        const exists = await db.schema.hasTable('users');
        expect(exists).toBe(true);
    });

    test('POST /auth/register creates user with hashed password', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send(testUser)
            .set('Accept', 'application/json');

        expect(res.status).toBeGreaterThanOrEqual(200);
        expect(res.status).toBeLessThan(300);

        const user = await db('users').where({ email: testUser.email }).first();
        expect(user).toBeDefined();
        expect(user.username).toBe(testUser.username);
        expect(user.password).not.toBe(testUser.password);
    });

    test('POST /auth/login returns status 200 and token or cookie', async () => {
        await request(app).post('/auth/register').send({
            email: 'login-test@example.com',
            username: 'login_test',
            password: 'LoginPass123!',
        });

        const loginRes = await request(app)
            .post('/auth/login')
            .send({ email: 'login-test@example.com', password: 'LoginPass123!' })
            .set('Accept', 'application/json');

        expect(loginRes.status).toBeGreaterThanOrEqual(200);
        expect(loginRes.status).toBeLessThan(300);

        const hasTokenInBody = loginRes.body && (loginRes.body.token || loginRes.body.accessToken);
        const hasCookie =
            loginRes.headers['set-cookie'] && loginRes.headers['set-cookie'].length > 0;

        expect(hasTokenInBody || hasCookie).toBeTruthy();
    });
});
