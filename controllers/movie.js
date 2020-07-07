const Movie = require("../models/movie")

exports.getMovieById = (req, res, next, id) => {
    Movie.findById(id).exec((error, movie) => {
        if(error || !movie){
            return res.status(400).json({
                error: "Movie not found id DB"
            })
        }
        req.movie = movie;
        next();
    })
};

exports.createMovie = (req, res) =>  {
    const Movie_data = new Movie(req.body);
    Movie_data.save((error, movie) => {
        if(error){
            return res.status(400).json({
                error: "Not able to save Movie in DB"
            })
        }
        res.json({movie});
    })
};

exports.getMovie = (req,res) => {
    return res.json(req.movie)
};

exports.getAllMovie = (req, res) => {
    Movie.find().exec((error, movies) => {
        if(error || !movies){
            return res.status(400).json({
                error: "No Movie found"
            })
        }
        res.json(movies);
    })
};

exports.updateMovie = (req, res) => {
    const Movie = req.movie;
    console.log("data : ", req.body)
    Movie.name = req.body.name;

    Movie.save((error, updatedMovie) => {
        if(error){
            return res.status(400).json({
                error: "Failed to update movie"
            })
        }
        res.json(updatedMovie)
    })
};

exports.removeMovie = (req, res) => {
    const Movie = req.movie;
    Movie.remove((error, movie) => {
        if(error){
            return res.status(400).json({
                error: "Failed to delete Movie"
            })
        }
        res.json({
            message: `${movie.name} - Successfully deleted`
        })
    })
}
