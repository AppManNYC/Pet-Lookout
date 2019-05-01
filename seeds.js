const mongoose = require("mongoose");
const LostPet = require("./models/lostPet");
const Comment   = require("./models/comment");

let data = [
    {
        image: "https://i.pinimg.com/originals/99/c0/4a/99c04a61e061d73deeb20673d6119354.jpg",
        address: "101 Shady Ln",
        city: "Vallejo",
        state: "CA",
        zip: "94591",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        image: "https://www.berksarl.org/wp-content/uploads/2018/01/24486-3.jpg",
        address: "2337 Porters Point Rd",
        city: "Colchester",
        state: "VT",
        zip: "05446",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        image: "https://tinygrowl.files.wordpress.com/2010/11/happy-dog-smile-582477.jpeg",
        address: "701 Windridge Dr",
        city: "Sandy Springs",
        state: "GA",
        zip: "30350",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
    LostPet.deleteOne( {}, function(err){
        if(err){
            console.log(err);
        }

        console.log("removed lost pets!");
        data.forEach(function(seed){
            LostPet.create(seed, function(err, lostPet){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a lost pet to db!");
                    Comment.create({
                        text: "Did you try putting signs up close to where you found her?",
                        author: "Lisa A."
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
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





