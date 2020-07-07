var mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; 

var theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    address: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    screens: [
        {
            type: ObjectId,
            ref: "Screen"
        }
    ],
    is_acive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Theatre", theatreSchema);