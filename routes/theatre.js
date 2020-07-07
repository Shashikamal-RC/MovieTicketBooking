const express = require("express")
const router = express.Router()

const { createTheatre,
        getTheatre,
        getAllTheatre,
        getTheatreById,
        updateTheatre,
        removeTheatre
      } = require("../controllers/theatre")
        
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

// whenever it see usedId as param it will populate req.profile
router.param("userId",getUserById); 
router.param("theatreId", getTheatreById);

//actual routes go here
router.post("/theatre/create/:userId", isSignedIn, isAuthenticated, isAdmin, createTheatre);
router.get("/theatre/:theatreId", getTheatre);
router.get("/theatres", getAllTheatre);
router.put("/theatre/:theatreId/:userId", isSignedIn, isAuthenticated, isAdmin, updateTheatre);
router.delete("/theatre/:theatreId/:userId",isSignedIn, isAuthenticated, isAdmin, removeTheatre);

module.exports = router;