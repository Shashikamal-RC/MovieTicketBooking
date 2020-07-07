var mongoose = require('mongoose')
var crypto = require('crypto')
const uuid = require("react-uuid");

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    lastname : {
        type : String,
        maxlength : 32,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    userinfo : {
        type : String,
        trim : true
    },
    encry_password : {
        type : String,
        required : true,
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    bookings : {
        type : Array,
        default : []
    }
}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuid();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {

    authenticate: function(plain_password){
        return this.securePassword (plain_password) === this.encry_password;
    },

    securePassword: function(plain_password){
        if (!plain_password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plain_password)
            .digest('hex')
        }catch (err){
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema)