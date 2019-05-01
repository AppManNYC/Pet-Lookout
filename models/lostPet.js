const mongoose = require("mongoose");

const lostPetSchema = new mongoose.Schema({
    nickName: String,
    image: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("LostPet", lostPetSchema);
