// ---------- ##### Declarations #####---------- //
const   express     =       require("express"),
        app         =       express(),
        mongoose    =       require("mongoose"),
        LostPet     =       require("./models/lostPet"),
        Comment     =       require("./models/comment"),
        seedDB      =       require("./seeds")


const PORT = process.env.PORT || 3000;


// ---------- ##### Middleware #####---------- //

// app.use( methodOverride("_method") );
app.use( express.urlencoded( {extended: true} ) );

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
seedDB();


// ---------- ##### GET Routes #####---------- //
app.get('/' , (req, res) => {
    res.render("landing");
});

app.get("/lostPets", (req, res) => {
    LostPet.find( {}, (err, allLostPets) => {
        if(err){
            console.log(err);
        }else{
            res.render("lostPets/index", {lostPets: allLostPets});
        }
    });
});

app.post("/lostPets", (req, res) => {
    LostPet.create(req.body, (err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/lostPets");
        }
    });
});

app.get("/lostPets/new", (req, res) => {
    res.render("lostPets/new");
});

app.get("/lostPets/:id", (req, res) => {
    LostPet.findById(req.params.id).populate("comments").exec( (err, foundLostPet) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundLostPet);
            res.render("lostPets/show", {lostPet: foundLostPet});
        }
    });
});

app.get("/lostPets/:id/comments/new", (req, res) => {
    LostPet.findById(req.params.id, function(err, lostPet){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {lostPet: lostPet});
        }
    })
});

app.post("/lostPets/:id/comments", (req, res) => {
    LostPet.findById(req.params.id, (err, lostPet) => {
        if(err){
            console.log(err);
            res.redirect("/lostPets");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    lostPet.comments.push(comment);
                    lostPet.save();
                    res.redirect('/lostPets/' + lostPet._id);
                }
            });
        }
    });
});

// ---------- ##### Database #####---------- //

mongoose.connect("mongodb://localhost:27017/petLookoutDB", {useNewUrlParser: true});
mongoose.connection.once("open", () => {
    console.log("Connected to Mongo");
});

// -------------- ##### Listener #####-------------- //
app.listen(PORT, () => console.log(`The Pet Spotter Server Is Operational On Port: ${PORT}`));


