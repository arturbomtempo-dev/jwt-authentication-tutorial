require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: { directory: './src/db/seeds' },
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        migrations: { directory: './src/db/migrations' },
        seeds: { directory: './src/db/seeds' },
    },
    test: {
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL || {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'testdb',
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: { directory: './src/db/seeds' },
    },
};
