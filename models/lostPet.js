const mongoose = require("mongoose");

const lostPetSchema = new mongoose.Schema({
    image: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    description: String
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ]
});

module.exports = mongoose.model("lostPet", lostPetSchema);

