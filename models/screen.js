var mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; 

var screenSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    theatre :  {
        type: ObjectId,
        ref: "Theatre",
        required: true
    },
    movies :  [
        {
            movie : {
                type: ObjectId,
                ref: "Movie",
                required: true
            },
            time : {
                type: String,
                default: "All",
                enum: ["Morning", "Afternoon", "Evening", "Night", "All" ]
            }
        }
    ],
    capacity : {
        type : Number,
        required: true
    },
    booked_seats : {
        type: Array,
        default: []
    }
},{
    timestamps: true
});


module.exports = mongoose.model("Screen", screenSchema);