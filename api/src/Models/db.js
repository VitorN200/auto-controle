const { Sequelize } = require('sequelize');

// Variáveis DB_* (padrão do projeto) ou MYSQL* (as que o MySQL do Railway já fornece).
const env = process.env;
const db = new Sequelize(
    env.DB_NAME || env.MYSQLDATABASE,
    env.DB_USER || env.MYSQLUSER,
    env.DB_ROOT_PASSWORD || env.MYSQLPASSWORD,
    {
        dialect: env.DB_DIALECT || 'mysql',
        host: env.DB_HOST || env.MYSQLHOST,
        port: env.DB_PORT || env.MYSQLPORT || 3306,
    },
);

module.exports = db;
