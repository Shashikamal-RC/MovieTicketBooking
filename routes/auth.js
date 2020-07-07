const express = require("express")
const router = express.Router()
const { signout, signup , signin, isSignedIn} = require("../controllers/auth")
const {check, validationResult} = require("express-validator") 

router.post("/signup", [
    check("name", "Name should be atleast 3 characters.").isLength({min: 3}),
    check("email", "email is required.").isEmail(),
    check("password", "password should be atleast 5 characters.").isLength({min: 3})
], signup)

router.post("/signin", [
    check("email", "email is required.").isEmail(),
    check("password", "password field is required.").isLength({min: 1})
], signin)

router.get("/signout", isSignedIn, signout)


module.exports = router;