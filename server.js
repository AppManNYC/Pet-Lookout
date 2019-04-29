// ---------- ##### Declarations #####---------- //
const   express     =       require("express"),
        app         =       express(),
        mongoose    =       require("mongoose"),
        LostPets    =       require("./models/lostPet.js");

const PORT = process.env.PORT || 3000;


// ---------- ##### Middleware #####---------- //

// app.use( methodOverride("_method") );
app.use( express.static("public") );
app.use( express.urlencoded( {extended: true} ) );


// ---------- ##### GET Routes #####---------- //
app.get('/' , (req, res) => {
    res.render("landing.ejs");
});

app.get("/lostPets/:index", (req, res) => {
    LostPets.findById( req.params.index, (err, foundLostPet) => {
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {
                lostPet: foundLostPet
            });
        }
    });
});

app.get("/lostPets", (req, res) => {
    LostPets.find( {}, (err, lostPets) => {
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs", {
                lostPets: lostPets
            });
        }
    });
});

app.get("/lostPets/new", (req, res) => {
    res.render("new.ejs");
});


// ---------- ##### POST Routes #####---------- //

app.post("/lostPets", (req, res) => {
    LostPets.create(req.body, (err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/lostPets");
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


