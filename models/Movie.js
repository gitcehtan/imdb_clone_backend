const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        unique:true
    },
    image: {
        type:String,
        require:true,
        unique:true

    },
    details: {
        type: String,
        require: true,
        unique:true
    }
})

module.exports = mongoose.model("Movie",movieSchema);