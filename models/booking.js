var mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; 

var bookingSchema = new mongoose.Schema({
    user_id :  {
        type: ObjectId,
        ref: "User"
    },
    movie_id : {
        type: ObjectId,
        ref: "Movie"
    },
    theatre_id : {
        type: ObjectId,
        ref: "Theatre"
    },
    screen_id : {
        type: ObjectId,
        ref: "Screen"
    },
    seat_numbers : {
        type: Array,
        default: [],
        required: true
    },
    payment_id: {
        type: ObjectId,
        ref: "Payment"
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);