const { Bus } = require('../models');
const Ticket = require('../models/tickets');
const User = require('../models/user');

exports.getAllTickets = (req, res, next) => {
    Ticket.findAll()
        .then(tickets => {
            res.status(200).json({ tickets: tickets });
        })
        .catch(err => console.log(err));
}


// Create a new ticket
exports.createTicket = async (req, res) => {
    try {

        const { email, name, seat_number, booking_date, bus_id } = req.body;

        const bus = await Bus.findByPk(bus_id);

        if (!bus) {
            return res.status(404).send({ message: 'Bus not found' });
        }

        const ticketCount = await Ticket.count({ where: { status: 'open' } });

        const ticketBySeat = await Ticket.findOne({ where: { seat_number } });

        if (ticketCount >= bus.seats) {
            return res.status(400).send({ message: 'All seats are taken' });
        }

        if (ticketBySeat.status === "closed") {
            return res.status(400).send({ message: 'This seat is taken' });
        }


        // Find the user. If not found, create one
        const [user, created] = await User.findOrCreate({
            where: { email, name },
            defaults: { email, name }
        });

        const ticket = await Ticket.create({ status: 'closed', seat_number, booking_date: new Date(booking_date), busId: bus_id, userId: user.id });

        res.send(ticket);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

exports.updateTicketStatus = async (req, res) => {
    const { id } = req.params;
    const { status, user_id, bus_id } = req.body;

    try {

        // Find the bus 
        const bus = await User.findByPk(bus_id);

        if (!bus) {
            return res.status(404).send({ message: 'Bus not found' });
        }

        // Find the bus 
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const ticket = await Ticket.update(
            { status, userId: user.id },
            { returning: true, where: { id } }
        );

        res.status(200).json({
            status: 'success',
            data: ticket,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.getTicketStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findOne({ where: { id }, attributes: ['status'] });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found!' });
        }

        res.status(200).json({
            status: 'success',
            data: ticket,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};


exports.getUserByTickerId = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id, { include: { model: User, as: 'user' } });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found!' });
        }

        const { name, email } = ticket.user;


        res.status(200).json({
            status: 'success',
            data: { name, email },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.getAllTicketsByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const tickets = await Ticket.findAll({ where: { status } });

        res.status(200).json({
            status: 'success',
            data: tickets,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};


exports.resetTickets = async (req, res) => {
    try {
        // Reset all tickets to open and remove user relationship
        await Ticket.update({ status: 'open', userId: null, booking_date: null }, { where: {} });

        // Get all tickets
        const tickets = await Ticket.findAll();

        res.status(200).json({ message: 'All tickets reset', tickets });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};