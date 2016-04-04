// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//code for Nathan's masher
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

//Show (GET) profile data
 app.get('/api/profile', function(req,res){
 console.log('get api profile');
   var profileJson = {
                        name: "Hila Vaisler",
                        github_link: "https://github.com/hilava",
                        linkedin_link:"https://www.linkedin.com/in/hila-vaisler-534b9a7",
                        image:"http://i.imgur.com/PEtCW8H.jpg",
                        current_city: "Sunnyvale",
                        past_cities: [{ name: 'Givataim', country: 'Israel' },
                                      { name: 'Philadelphia', country: 'USA' }],
                        countries_visited:[{name: 'Israel'}, {name: 'USA'}, {name: 'Thailand'}, {name: 'Italy'},
                                          {name: 'Cypress'}, {name: 'Spain'}, {name: 'Dominican Republic'},
                                          {name: 'Mexico'},{name: 'France'},{name: 'Venezuela'}, {name: 'Ecuador'},
                                          {name: 'Guatemala'},{name: 'Belize'}],
                        languages: [{name: 'English'}, {name: 'Hebrew'}]
                      };
  res.json(profileJson);
 });

//GET all movies
app.get('/api/movies', function (req,res){
  console.log('get all movies');
  db.Movie.find(function(err, movies){
    if(err) { return console.log("error: " + err); }
    console.log("found movies: " + movies);
    res.json(movies);
  });

});

//GET movie by id
app.get('/api/movies/:id', function(req, res){
  console.log('get movie by id');
  db.Movie.findById(req.params.id, function(err, movie){
    if(err) {return console.log("error: " +err);}
    console.log("found movie: " + movie);
    res.json(movie);
  });
});

//Add new movie (POST)
app.post('/api/movies', function(req, res){
  console.log('add new movie');
  //create new movie with form data ('req.body')
  var newMovie = new db.Movie({
    name: req.body.name,
    genre: req.body.genre,
    year: req.body.year,
    director: req.body.director,
    favorite_actor: req.body.actor,
    image: req.body.image
  });
  //save newMovie to db
  newMovie.save(function(err, movies){
    if (err){ return console.log("save error: " + err);}
    console.log("movie saved: " + movie);
    res.json(movie);
  });
});

//Delete movie
app.delete('/api/movies/:id', function(req, res){
  console.log('delete movie');
  var movieId = req.params.id;
  db.Movie.findOneAndRemove({ _id: movieId }, function(err, movie){
    if(err){ return console.log("error deleting: " + err);}
    console.log("movie deleted: " + movie);
    res.json(movie);
  });
});

//Update (PUT) movie
app.put('/api/movies/:id', function(req, res){
  console.log('update movie');
  // get movie id from url params (`req.params`)
  var movieId = req.params.id;
  // find movie in db by id
  Movie.findById(movieId, function(err, foundMovie){
    if(err) {res.status(500).json({error: err.message});}
    //update movie attributes
    foundMovie.name= req.body.name;
    foundMovie.genre = req.body.genre;
    foundMovie.year = req.body.year;
    foundMovie.director = req.body.director;
    foundMovie.favorite_actor = req.body.actor;
    foundMovie.image = req.body.image;
    //save updated movie in db
    foundMovie.save(function(err, savedMovie){
      if(err){res.status(500).json({error: err.message});}
      console.log("saved movie: " + savedMovie);
      res.json(savedMovie);
    });
  });
});


//GET documentaion of API endpoints
app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/hilava/express_self_api/README.md",
    base_url: "http://strawberry-surprise-58996.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My profile data"},
      {method: "GET", path: "/api/movies", description: "Show all movies"},
      {method: "GET", path: "/api/movies/:id", description: "Show one movie by id"},
      {method: "POST", path: "/api/movies/:id", description: "Create a new movie"},
      {method: "DELETE", path: "/api/movies:id", description: "Delete movie by id"},
      {method: "PUT", path: "/api/movies/:id", description: "Update movie by id"},
    ]
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
