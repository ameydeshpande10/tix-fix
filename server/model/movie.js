const mongoose = require("mongoose");

const movie = new mongoose.Schema({
  name: String,
  actors: String,
  director: String,
  certification: String,
  genre: String,
  movie_length: Number,
  release_date: Date,
  start_date: Date,
  end_date: Date,
  first_show: String,
  second_show: String,
  image: String,
});

module.exports = mongoose.model("movie", movie);
