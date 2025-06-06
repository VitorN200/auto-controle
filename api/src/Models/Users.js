const db = require('./db');
const { DataTypes } = require('sequelize');

const Users = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        isIn: [['Ativo', 'Desativado', 'Excluido']]
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
});

Users.belongsTo(Users, { foreignKey: 'createdBy', as: 'createdByUser'});
Users.belongsTo(Users, { foreignKey: 'updatedBy', as: 'updatedByUser'});

module.exports = Users;