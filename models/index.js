const User = require('./user')
const Ticket = require('./tickets')
const Bus = require('./bus')


User.hasMany(Ticket, { as: 'tickets', foreignKey: 'userId' });
Ticket.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Bus.hasMany(Ticket, { as: 'tickets', foreignKey: 'busId' });
Ticket.belongsTo(Bus, { as: 'bus', foreignKey: 'busId' });


module.exports = { Bus, Ticket, User };

