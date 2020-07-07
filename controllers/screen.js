const Screen = require("../models/screen")
const Theatre = require("../models/theatre");
const { template } = require("lodash");

exports.getScreenById = (req, res, next, id) => {
    Screen.findById(id).exec((error, screen) => {
        if(error || !screen){
            return res.status(400).json({
                error: "Screen not found id DB"
            })
        }
        req.screen = screen;
        next();
    })
};

exports.createScreen = (req, res) =>  {
    const Screen_data = new Screen(req.body);
    Screen_data.theatre = req.params.theatreId;

    console.log("data: ",Screen_data)

    Screen_data.save((error, screen) => {
        if(error){
            return res.status(400).json({
                error: "Not able to save Screen in DB"
            })
        }

        var theatre = req.theatre;
        theatre.screens.push(screen._id);

        theatre.save((error, updatedTheatre) => {
            if(error){
                return res.status(400).json({
                    error: "Failed to update Theatre"
                })
            }
        })
        res.json({screen});
    })
};

exports.getScreen = (req,res) => {
    return res.json(req.screen)
};

exports.getAllScreen = (req, res) => {
    Screen.find()
        .populate('theatre', 'name address')
        .populate('movies.movie', 'name release_date')
        .exec((error, screens) => {
        if(error || !screens){
            return res.status(400).json({
                error: "No Screen found"
            })
        }
        res.json(screens);
    })
};

exports.updateScreen = (req, res) => {
    const Screen = req.screen;
    console.log("data : ", req.body)
    Screen.name = req.body.name;

    Screen.save((error, updatedScreen) => {
        if(error){
            return res.status(400).json({
                error: "Failed to update Screen"
            })
        }
        res.json(updatedScreen)
    })
};

exports.removeScreen = (req, res) => {
    const Screen = req.screen;
    Screen.remove((error, screen) => {
        if(error){
            return res.status(400).json({
                error: "Failed to delete Screen"
            })
        }
        res.json({
            message: `${screen.name} - Successfully deleted`
        })
    })
}

exports.availableSeats = (req, res) => {
    const screen = req.screen
    
    var available_seats = []
    for (var i=1;i<= screen.capacity; i++) {
        if(!screen.booked_seats.includes(i)){
            available_seats.push(i)
        }
    }
    res.json({
        "total seats available" : available_seats.length,
        "available seat numbers" : available_seats
    })
}


exports.isSeatsAvailable = (req, res) => {
    const screen = req.screen
    const seats = req.seats
    var seat_status = true;

    for (var i=0;i< seats.length ; i++) {
        if(seats[i] > screen.capacity){
            seat_status = false;
            break;
        }
        if(screen.booked_seats.includes(seats[i])){
            seat_status = false;
            break;
        }
    }

    return seat_status
}