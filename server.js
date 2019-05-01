// ---------- ##### Declarations #####---------- //
const   express         =       require("express"),
        app             =       express(),
        mongoose        =       require("mongoose"),
        passport        =       require("passport"),
        flash           =       require("connect-flash"),
        methodOverride  =       require("method-override"),
        LocalStrategy   =       require("passport-local"),
        LostPet         =       require("./models/lostPet"),
        Comment         =       require("./models/comment"),
        User            =       require("./models/user"),
        seedDB          =       require("./seeds");


const   commentsController   =       require("./controllers/commentsController"),
        lostPetsController  =       require("./controllers/lostPetsController"),
        indexController     =       require("./controllers/indexController");



const PORT = process.env.PORT || 3000;


// ---------- ##### Middleware #####---------- //


app.use( express.urlencoded( {extended: true} ) );
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.set('view engine', 'ejs');
//seedDB();

// ---------- ##### Passport Configuration #####---------- //
app.use(require("express-session")({
    secret: "Oliver is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexController);
app.use("/lostPets", lostPetsController);
app.use("/lostPets/:id/comments", commentsController);


// ---------- ##### Database #####---------- //

mongoose.connect("mongodb://localhost:27017/petLookoutDB", {useNewUrlParser: true});
mongoose.connection.once("open", () => {
    console.log("Connected to Mongo");
});

// -------------- ##### Listener #####-------------- //
app.listen(PORT, () => console.log(`The Pet Spotter Server Is Operational On Port: ${PORT}`));
