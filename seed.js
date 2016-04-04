// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var movie_list = [
          {
            name: 'Pretty Women',
            genre: 'Romance',
            year: 1990,
            director: 'Garry Marshall',
            favorite_actor: 'Julia Roberts',
            image:"https://www.moviepilot.de/files/images/0562/0873/Pretty_Woman_4.jpg"
         },
         {
            name: 'The Breakfast Club',
            genre: 'Comedy-Drama',
            year: 1985,
            director: 'John Hughes',
            favorite_actor: 'Molly Ringwald',
            image:"https://babyyoullbefamous.files.wordpress.com/2010/06/bbjdfgaifgdbg-the-breakfast-club.jpg"
         },
         {
            name: 'Top Gun',
            genre: 'Drama-Romance',
            year: 1986,
            director: 'Tony Scott',
            favorite_actor: 'Tom Cruise',
            image:"https://www.tourismnewwestminster.com/wp-content/uploads/2014/06/Top-Gun.jpg"
         },
         {
            name: 'Some Like It Hot',
            genre: 'Comedy',
            year: 1959,
            director: 'Billy Wilder',
            favorite_actor: 'Tony Curtis',
            image:"https://images2.fanpop.com/image/photos/9400000/Classic-Wallpaper-classic-movies-9498517-1024-768.jpg"
         },
           {
           name: 'Spaceballs',
           genre: 'Comedy, Science Fiction',
           year: 1987,
           director: 'Mel Brooks',
           favorite_actor: 'Mel Brooks',
           image:"https://fanart.tv/fanart/movies/957/movieposter/spaceballs-5229798c85421.jpg"
         },
         {
          name: 'Pulp Fiction',
          genre: 'Thriller, Crime',
          year: 1994,
          director: 'Quentin Tarantino',
          favorite_actor: 'Samuel L. Jackson',
          image:"https://www.moviepilot.de/files/images/0254/1585/pulp-fiction-cover.jpg"
        },
        {
         name: 'The Hunger Games',
         genre: 'Science Fiction, Adventure',
         year: 2012,
         director: 'Gary Ross',
         favorite_actor: 'Jennifer Lawrence',
         image:"https://www.ew.com/sites/default/files/i/2011/12/01/Illustrated-Movie-Companion_510_0.jpg"
        },
        {
          name: 'Ghost',
          genre: 'Thriller, Drama, Romance',
          year: 1990,
          director: 'Jerry Zucker',
          favorite_actor: 'Patrick Swayze',
          image:"https://1.bp.blogspot.com/-INTFEwdEhzM/TxVXXJY446I/AAAAAAAAJn4/_3lccW6iLYM/s1600/Demi_Moore.jpg"
        },
        {
         name: 'The Goonies',
         genre: 'Adventure, Family',
         year: 1985,
         director: 'Richard Donner',
         favorite_actor: 'Sean Astin',
         image: "https://3.bp.blogspot.com/-16KXvs0VeRM/UH1dbV5sApI/AAAAAAAAU2c/Ne7xkgppCcE/s640/The+Goonies.jpg"
        },
        ];


    db.Movie.remove({}, function(err, movies){
      console.log('removed all movies');
      movie_list.forEach(function (movieData) {
          var movie = new db.Movie({
            title: movieData.title,
            name:  movieData.name,
            genre: movieData.genere,
            year: movieData.year,
            director: movieData.director,
            favorite_actor: movieData.favorite_actor,
            image:movieData.image
          });
          movie.save(function(err, savedMovie){
          if (err) {
            return console.log(err);
          }
          console.log('saved ' + savedMovie.name );
        });
      });
    });
