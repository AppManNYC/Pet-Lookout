const mongoose = require("mongoose");
const LostPet = require("./models/lostPet.js");
const Comment   = require("./models/comment.js");

let data = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTm-0gU3iJyuXzV2LW7bqpGeBNPxqFnPDVYGJ0aJ1iUpZOj4BRA",
        address: "101 Shady Ln",
        city: "Vallejo",
        state: "CA",
        zip: "94591",
        type: "Cat",
        description: "The cat is super friendly"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Db5QRDtbc-vOh7ZwCFbqTxqIlaXMRNsh3IF6UeferjfUIz2s",
        address: "2337 Porters Point Rd",
        city: "Colchester",
        state: "VT",
        zip: "05446",
        type: "Dog",
        description: "WHAT A SWEETHEART! Playful but not potty-trained"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCj0MIr8Dp7CziWq2kMnENiucC2rriyqIyo_pZ3NhtVWHNCLrBw",
        address: "701 Windridge Dr",
        city: "Sandy Springs",
        state: "GA",
        zip: "30350",
        type: "Dog",
        description: "Hasn't ate in 2 days! I'm getting very worried."
    }
]

function seedDB(){
    LostPet.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed lost pets!");
        data.forEach(function(seed){
            LostPet.create(seed, function(err, lostPet){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a lost pet to db!");
                    Comment.create(
                        {
                            text: "Did you try putting signs up close to where you found her?",
                            author: "Lisa A."
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                lostPet.comments.push(comment);
                                lostPet.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;