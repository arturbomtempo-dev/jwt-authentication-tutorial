/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.enu('role', ['user', 'admin']).notNullable().defaultTo('user');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
