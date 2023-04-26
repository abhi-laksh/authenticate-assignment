const { Bus } = require("../models");

// create bus
exports.createBus = (req, res, next) => {

    const name = req.body.name;
    const seats = req.body.seats;

    Bus.create({
        name: name,
        seats: seats
    })
        .then(data => {

            res.status(201).json({
                message: 'Bus created successfully!',
                data
            });

        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                message: 'An error occurred!',
                error: err
            });

        });
}


exports.getAllBuses = (req, res, next) => {
    Bus.findAll()
        .then(bus => {
            res.status(200).json({ bus });
        })
        .catch(err => console.log(err));
}
