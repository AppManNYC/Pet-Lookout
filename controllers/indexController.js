const express   =   require("express");
const passport  =   require("passport");
const User      =   require("../models/user");
const router    =   express.Router();




router.get('/' , (req, res) => {
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
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

router.get("/login", (req, res) => {
    res.render("login");
});



router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/lostPets",
        failureRedirect: "/login"
    }), (req, res) => {
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/lostPets");
});

module.exports = router;
