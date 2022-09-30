const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//Admin-path-movies
router.post("/movieregister", movieController.AddMovieS);
router.get("/movie/remove-movie", movieController.DeleteMovie);
router.post("/addshows", movieController.AddShows);

router.post("/movie/add-movie", movieController.AddMovie);
router.get("/movie/remove-movie", movieController.DeleteMovie);

router.get("/movie/get-movie/:movie_name", movieController.GetMovie);
router.get("/movies", movieController.Movies);
router.get("/movies/cursor", movieController.MoviesCursor);
router.post("/movie/delete-movie", movieController.DeleteMovie);
router.get("/moviedetails/:id", movieController.GetMovieDetails);

router.post("/showdetails-single/:id", movieController.PostShowDetailsSingle);
router.get("/showdetails/:id", movieController.GetShowDetails);
router.post("/bookseats/:id", movieController.PostBookSeat);

module.exports = router;
