const express = require("express");
const movie = require("../model/movie");
const Show = require("../model/show");
const multer = require("multer");
const fs = require("fs");
var path = require("path");
const app = express();
app.set("view engine", "ejs");

// storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// Add movie
exports.AddMovie = async (req, res) => {
  console.log("hit add move ap");
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        const currentMovie = new movie({
          name: req.body.name,
          actors: req.body.actors,
          director: req.body.director,
          certification: req.body.certification,
          genre: req.body.genre,
          movie_length: req.body.movie_length,
          release_date: req.body.release_date,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          first_show: req.body.first_show,
          second_show: req.body.second_show,
          image: {
            data: req.file.filename,
            contentType: "image/png",
          },
        });
        console.log("movie created");
        if (currentMovie) {
          console.log("movie created");
        }
        currentMovie.save();
        res.send({ message: "Movie added" });
      }
    });
  } catch (error) {
    res.send({ message: error });
  }
};

//router.post("/movieregister",
exports.AddMovieS = async (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      console.log(error);
    } else {
      try {
        const {
          name,
          actors,
          director,
          certification,
          genre,
          length,
          release_date,
          start_date,
          end_date,
          first_show,
          second_show,
          image,
        } = req.body;
        const newMovie = new movie({
          name,
          actors,
          director,
          certification,
          genre,
          length,
          release_date,
          start_date,
          end_date,
          first_show,
          second_show,
          image,
          // : {
          //     data: fs.readFileSync("uploads/" + req.file.filename),
          //     contentType: 'image/png'
          // }
        });
        //console.log(newMovie);
        console.log("movie added successfully");
        newMovie.save();
        res.status(200).send({ message: "Movie added sucessfully" });
      } catch (error) {
        console.error(error);
      }
    }
  });
};

// get movie by naem
exports.GetMovie = async (req, res) => {
  try {
    const { movie_name } = req.params;
    //const movie_name = req.body.movie_name;
    console.log(movie_name);
    var currentMovie = await movie.findOne({
      name: movie_name,
    });
    console.log(currentMovie);
    res.send(currentMovie);
  } catch (error) {
    res.send({ message: error });
  }
};

// Delete movie by movie name
exports.DeleteMovie = async (req, res) => {
  try {
    var name = req.body.movie_name;
    if (!name) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    var movie = await movie
      .findOne({
        name: name,
      })
      .remove()
      .exec()
      .then(
        res.status(200).send({
          message: "Movie removed sucessfully!",
        }),
        console.log("Movie removed!")
      )
      .catch((err) => {
        res.status(200).send({
          message: "Error, Movie not deleted",
        });
      });
  } catch (error) {
    res.send({ message: error });
  }
  console.log(movie);
  res.end();
};

// router.get("/movies",
exports.Movies = async (req, res) => {
  try {
    const movies = await movie.find({});

    res.status(200).send({ data: movies });
    res.end();
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    res.end();
  }
  res.end();
};

// Get all movies with curser
exports.MoviesCursor = async (req, res) => {
  try {
    const cursor = await movie.find({}).cursor();
    res.status(200).send({ data: cursor });
    res.end();
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    res.end();
  }
  res.end();
};

//router.get("/moviedetails/:id",
exports.GetMovieDetails = async (req, res) => {
  try {
    const movies = await movie.findById(req.params.id);
    res.status(200).send({ data: movies });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

//router.delete("/delmovie/:id",
exports.DeleteMovie = async (req, res) => {
  try {
    const name = req.body.movie_name;
    if (!name) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const movies = await movie
      .findOne({ name: req.body.movie_name })
      .remove()
      .exec();
    res
      .status(200)
      .send({ message: `${name} Movie deleted`, name: movies.name });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

//Shows
//router.post("/addshows",
exports.AddShows = async (req, res) => {
  try {
    const {
      movieId,
      show,
      time,
      platinumRows,
      platinumRate,
      goldRows,
      goldRate,
      silverRows,
      silverRate,
    } = req.body;
    const newShow = new Show({
      movieId,
      show,
      time,
      platinumRows,
      platinumRate,
      goldRows,
      goldRate,
      silverRows,
      silverRate,
    });
    await newShow.save();
    res.status(201).json("show added successfully");
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

//search with time
//router.get("/showdetails/:id",
exports.PostShowDetailsSingle = async (req, res) => {
  try {
    let id = req.params.id;
    let date = req.body.date.split("T")[0];
    let d = new Date(date);
    let time = req.body.time;

    const show = await Show.find({ id });

    if (show == null) {
      res.send({ message: "shows unavailable" });
    } else {
      show.map((x) => {
        if (x.show.toString() == d.toString() && x.time == time) {
          console.log(x);
          res.send(x);
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
//search with time
//router.get("/showdetails/:id",
exports.GetShowDetails = async (req, res) => {
  try {
    let id = req.params.id;

    const show = await Show.find({ id });

    if (show == null) {
      res.send({ message: "shows unavailable" });
    } else {
      res.send(show);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// book ticket, add to Show
//router.post('/bookseats/:id',
exports.PostBookSeat = async (req, res) => {
  let id = req.params.id;
  let bookedSeats = req.body.bookedSeats;
  try {
    for (var i = 0; i < bookedSeats.length; i++) {
      console.log("adding");
      await Show.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: {
            bookedSeats: bookedSeats[i],
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  res.json({ status: "seat booked" });
};
