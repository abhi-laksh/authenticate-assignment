const Sequelize = require('sequelize');
const db = require('../util/database');

const Ticket = db.define('ticket', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false,
        defaultValue: 'open',
    },
    seat_number: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    booking_date: {
        type: Sequelize.DATE,
        allowNull: true,
    }
});


module.exports = Ticket;