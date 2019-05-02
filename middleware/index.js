const LostPet = require("../models/lostPet");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.lostPetCheck = (req, res, next) => {
    if(req.isAuthenticated()){
        LostPet.findById(req.params.id, (err, foundLostPet) =>{
            if(err){
                req.flash("error", "Lost Pet not found");
                res.redirect("back");
            }  else {
                if(foundLostPet.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.commentCheck = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            }  else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Required.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You still need to log in.");
        res.redirect("back");
    }
}

middlewareObj.loggedStatus = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You still need to log in.");
    res.redirect("/login");
}

module.exports = middlewareObj;