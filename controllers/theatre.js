const Theatre = require("../models/theatre")

exports.getTheatreById = (req, res, next, id) => {
    Theatre.findById(id).exec((error, theatre) => {
        if(error || !theatre){
            return res.status(400).json({
                error: "Theatre not found id DB"
            })
        }
        req.theatre = theatre;
        next();
    })
};

exports.createTheatre = (req, res) =>  {
    const TheatreData = new Theatre(req.body);
    TheatreData.save((error, theatre) => {
        if(error){
            return res.status(400).json({
                error: "Not able to save Theatre in DB"
            })
        }
        res.json({theatre});
    })
};

exports.getTheatre = (req,res) => {
    return res.json(req.theatre)
};

exports.getAllTheatre = (req, res) => {
    Theatre.find()
    .populate('screens', 'name capacity')    
    .exec((error, theatres) => {
        if(error || !theatres){
            return res.status(400).json({
                error: "No Theatre found"
            })
        }
        res.json(theatres);
    })
};

exports.updateTheatre = (req, res) => {
    Theatre.findByIdAndUpdate(
        {_id: req.theatre._id},
        {$set: req.body},
        {new : true, useFindAndModify: false},
        (error, theatre) => {
            if(error){
                return res.status(400).json({
                    error: "You are not authorized to update this user."
                })
            }
            return res.json(theatre)    
        }
    )
};

exports.removeTheatre = (req, res) => {
    const Theatre = req.theatre;
    Theatre.remove((error, theatre) => {
        if(error){
            return res.status(400).json({
                error: "Failed to delete Theatre"
            })
        }
        res.json({
            message: `${theatre.name} - Successfully deleted`
        })
    })
}
