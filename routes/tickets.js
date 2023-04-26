const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets');


// /tickets
router.get('/', ticketController.getAllTickets); // /tickets/
router.post('/', ticketController.createTicket); // /tickets/
router.put('/:id/status', ticketController.updateTicketStatus); // /tickets/1/status
router.get('/:id/status', ticketController.getTicketStatus); // /tickets/1/status
router.get('/status/:status', ticketController.getAllTicketsByStatus); // /tickets/status/open
router.delete('/reset', ticketController.resetTickets); // /tickets/status/open
router.get('/:id/user', ticketController.getUserByTickerId); // /tickets/status/open

module.exports = router;
