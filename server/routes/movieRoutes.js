const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//Admin-path-movies
router.post("/movie/add-movie", movieController.PostAddMovie);
router.post("/movie/delete-movie", movieController.GetDeleteMovie);
router.get("/movies", movieController.GetMovies);
router.get("/movie/details/:id", movieController.GetMovieDetails);

// shows methods
router.post("/shows/add-shows", movieController.PostAddShows);
router.get("/shows/show-details/:id", movieController.GetShowDetails);

//unused
// router.post("/movie/add-movie-img", movieController.PostAddMovieWithImg);
// router.post("/showdetails-single/:id", movieController.PostShowDetailsSingle);
// router.post("/bookseats/:id", movieController.PostBookSeat);

module.exports = router;
