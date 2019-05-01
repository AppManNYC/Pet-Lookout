const express   =   require("express");
const passport  =   require("passport");
const router    =   express.Router();
const User      =   require("../models/user");



router.get('/' , (req, res) => {
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Pet Lookout " + user.username);
            res.redirect("/lostPets");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});



router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/lostPets",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/lostPets");
});

module.exports = router;
