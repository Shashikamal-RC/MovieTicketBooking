var mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; 
 
var movieSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    language: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    release_date: {
        type:Date,
        required: true
    },
    theatres: [
        {
            type: ObjectId,
            ref: "Theatre"
        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model("Movie", movieSchema);