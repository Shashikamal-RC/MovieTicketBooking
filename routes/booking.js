const express = require("express")
const router = express.Router()

const { getAllBooking,
        getBooking,
        getBookingById,
        createBooking
      } = require("../controllers/booking")
        
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const { getScreenById } = require("../controllers/screen")
const { getTheatreById } = require("../controllers/theatre")

// whenever it see usedId as param it will populate req.profile
router.param("userId",getUserById);
router.param("bookingId", getBookingById);
router.param("screenId", getScreenById);
router.param("theatreId", getTheatreById);

//actual routes go here
router.post("/booking/create/:theatreId/:screenId/:userId", isSignedIn, isAuthenticated, createBooking);
router.get("/booking/:bookingId/:userId", isSignedIn, isAuthenticated, getBooking);
router.get("/bookings", isSignedIn, isAuthenticated, isAdmin, getAllBooking);

module.exports = router;