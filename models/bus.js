const Sequelize = require('sequelize');
const db = require('../util/database');

const Bus = db.define('bus', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seats: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Bus;