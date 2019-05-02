const express = require("express");
const router  = express.Router({mergeParams: true});
const LostPet = require("../models/lostPet");
const Comment = require("../models/comment");
const middleware = require("../middleware");



router.get("/new", middleware.isLoggedIn, (req, res) =>{
    console.log(req.params.id);
    LostPet.findById(req.params.id, (err, lostPet) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {lostPet: lostPet});
        }
    });
});


router.post("/", middleware.isLoggedIn,(req, res) => {
    LostPet.findById(req.params.id, (err, lostPet) => {
        if(err){
            console.log(err);
            res.redirect("/lostPets");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    lostPet.comments.push(comment);
                    lostPet.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/lostPets/' + lostPet._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {lostPet_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/lostPets/" + req.params.id );
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/lostPets/" + req.params.id);
        }
    });
});


module.exports = router;
