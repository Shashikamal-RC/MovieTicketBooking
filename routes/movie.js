const express = require("express")
const router = express.Router()

const { getAllMovie,
        getMovie,
        getMovieById,
        createMovie,
        removeMovie,
        updateMovie
      } = require("../controllers/movie")
        
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

// whenever it see usedId as param it will populate req.profile
router.param("userId",getUserById); 
router.param("movieId", getMovieById);

//actual routes go here
router.post("/movie/create/:userId", isSignedIn, isAuthenticated, isAdmin, createMovie);
router.get("/movie/:movieId", getMovie);
router.get("/movies", getAllMovie);
router.put("/movie/:movieId/:userId", isSignedIn, isAuthenticated, isAdmin, updateMovie);
router.delete("/movie/:movieId/:userId",isSignedIn, isAuthenticated, isAdmin, removeMovie);

module.exports = router;