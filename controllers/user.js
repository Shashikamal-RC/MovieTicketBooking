const User = require("../models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: "User not found in DB."
            })
        }
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)    
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new : true, useFindAndModify: false},
        (error, user) => {
            if(error){
                return res.status(400).json({
                    error: "You are not authorized to update this user."
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            return res.json(user)    
        }
    )
}