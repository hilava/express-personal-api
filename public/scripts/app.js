console.log("Sanity Check: JS is working!");
var template;
var $movieList;
var allMovies = [];


// {method: "GET", path: "/api", description: "Describes all available endpoints"},
// {method: "GET", path: "/api/profile", description: "My profile data"},
// {method: "GET", path: "/api/movies", description: "Show all movies"},
// {method: "GET", path: "/api/movies/:id", description: "Show one movie by id"},
// {method: "POST", path: "/api/movies/:id", description: "Create a new movie"},
// {method: "DELETE", path: "/api/movies:id", description: "Delete movie by id"},
// {method: "PUT", path: "/api/movies/:id", description: "Update movie by id"},

$(document).ready(function(){

  $movieList = $('#movieTarget');

  //get profile data
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: showProfileSuccess,
    error: showProfileError
  });

  //get all movies
  $('#showMoviesBtn').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    method: 'GET',
    url: '/api/movies',
    success: showMovieSuccess,
    //error: showMoviesError
  });
});

});
//End of document ready

function showProfileSuccess(json){
  console.log(json);
// compile handlebars template
var source = $('#profile-template').html();
var template = Handlebars.compile(source);

var name = json.name;
var image = json.image;
var github_link = json.github_link;
var linkedin_link = json.linkedin_link;
var current_city = json.current_city;
var past_cities = json.past_cities;
var countries_visited = json.countries_visited;
var languages = json.languages;
var profileHtml = template( {name : name, image: image, githubLink: github_link, linkinLink: linkedin_link,
                  currentCity: current_city, pastCities: past_cities, countriesVisited: countries_visited,
                  languages: languages} );
$('#profileTarget').append(profileHtml);
}

function showProfileError(err){
  console.log("Error: " + err);
}


function showMovieSuccess(json){
  // compile handlebars template
  var source = $('#movies-template').html();
  var template = Handlebars.compile(source);

  var movieName = json.name;
  var movieGenre = json.genre;
  var moviesHtml = template({movieName: movieName, movieGenre: movieGenre});
  console.log("moviesHtml: " + moviesHtml);
  $('#moviesTarget').append(moviesHtml);
}

// function showMoviesError (err){
//   console.log("Error: " + err);
// }
