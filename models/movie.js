var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MovieSchema = new Schema({
   name: String,
   genre: String,
   year: Number,
   director: String,
   favorite_actor: String,
   image: String
 });


var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
