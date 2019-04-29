const mongoose = require("mongoose");
const LostPet = require("./models/lostPet");
const Comment   = require("./models/comment");

let lostPets = [
];

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
                    console.log("added a lost pet");
                    Comment.create(
                        {
                            text: "I SAW THIS DOG!",
                            author: "Lisa Soprano"
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