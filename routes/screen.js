const express = require("express")
const router = express.Router()

const { getAllScreen,
        getScreen,
        getScreenById,
        createScreen,
        updateScreen,
        removeScreen,
        availableSeats
      } = require("../controllers/screen")
        
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getTheatreById } = require("../controllers/theatre")

// whenever it see usedId as param it will populate req.profile
router.param("userId",getUserById); 
router.param("screenId", getScreenById);
router.param("theatreId", getTheatreById);

//actual routes go here
router.post("/screen/create/:theatreId/:userId", isSignedIn, isAuthenticated, isAdmin, createScreen);
router.get("/screen/:screenId", getScreen);
router.get("/screens", getAllScreen);
router.put("/screen/:theatreId/:screenId/:userId", isSignedIn, isAuthenticated, isAdmin, updateScreen);
router.delete("/screen/:theatreId/:screenId/:userId",isSignedIn, isAuthenticated, isAdmin, removeScreen);

router.get("/screen/seats/:theatreId/:screenId/:userId",isSignedIn, isAuthenticated, availableSeats);

module.exports = router;