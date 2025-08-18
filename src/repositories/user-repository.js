const db = require('../db/db');

async function createUser(user) {
    const [created] = await db('users')
        .insert(user)
        .returning(['id', 'email', 'username', 'role', 'created_at', 'updated_at']);
    return created;
}

async function findByEmail(email) {
    return db('users').where({ email }).first();
}

async function findByUsername(username) {
    return db('users').where({ username }).first();
}

async function findById(id) {
    return db('users').where({ id }).first();
}

module.exports = {
    createUser,
    findByEmail,
    findByUsername,
    findById,
};
