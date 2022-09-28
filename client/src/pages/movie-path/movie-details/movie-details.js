import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, NavLink } from "react-router-dom";
import MovieDetailsIndividual from "./movie-details-individual";

export const MovieDetails = () => {
  const params = useParams();
  const id = useParams();
  const movieDetails = MovieDetailsIndividual(params);
  var adminCheck = localStorage.getItem("Admin");

  const [hasLoaded, setHasLoaded] = useState(false);

  try {
    const name = movieDetails.name;
    const actors_name = movieDetails.actors;
    const certification = movieDetails.certification;
    const director = movieDetails.director;
    const genre = movieDetails.genre;
    const movie_length = movieDetails.movie_length;
    const release_date = movieDetails.release_date; //.split("T")[0]
    const start_date = movieDetails.start_date; //.split("T")[0]
    const end_date = movieDetails.end_date; //.split("T")[0]
    const first_show = movieDetails.first_show;
    const second_show = movieDetails.second_show;
    const image = movieDetails.image;

    const RenderBookTicketButton = () => {
      let date = new Date();
      let releaseDate = new Date(release_date);

      if (adminCheck === null && releaseDate < date) {
        if (Cookies.get("loggedIn") === "true") {
          return (
            <button className="btn ">
              <NavLink to={`/book-ticket/${id.id}`}>Book Tickets</NavLink>
            </button>
          );
        }
      } else if (adminCheck === "Admin") {
        return (
          <button className="btn ">
            <NavLink to={`/addshows/${id.id}`}>Add Shows</NavLink>
          </button>
        );
      }
    };

    return (
      <>
        <div className="conatiner pt-2 ml-auto mr-auto col-10 d-flex justify-content-center align-items-center">
          <div
            key={name}
            className="conatiner pt-2 ml-auto mr-auto col-10 d-flex justify-content-center align-items-center"
          >
            {/*mt-5 p-2 */}

            <div className="conatiner col-10 ">
              <div className="cards d-flex col-10">
                <div className="col-8">
                  <img
                    src={image}
                    className="card-img-top p-2 card_image img-fluid"
                    alt="..."
                  />
                </div>
                <div className="col bg-white">
                  <div className="card-body h-50">
                    <p
                      className="card-title"
                      style={{ textTransform: "capitalize" }}
                    >
                      <label className="me-2 fw-bold">Title:&nbsp; </label>
                      <span>
                        <h2>{name}</h2>
                      </span>
                    </p>
                    <br></br>
                    <p className="card-text">
                      <label className="me-2 fw-bold">Actors:&nbsp; </label>
                      {actors_name}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">Director:&nbsp; </label>
                      {director}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">Genre:&nbsp; </label>
                      {genre}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">
                        Certification:&nbsp;
                      </label>
                      {certification}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">
                        Movie length:&nbsp;
                      </label>
                      {movie_length}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">
                        Release Date:&nbsp; {release_date.split("T")[0]}
                      </label>
                    </p>
                    {/* <p className="card-text">
                      <label className="me-2 fw-bold">
                        Movie Availabe Date:
                      </label>
                      {start_date}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">Movie End Date: </label>
                      {end_date}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">First show: </label>
                      {first_show}
                    </p>
                    <p className="card-text">
                      <label className="me-2 fw-bold">Second show: </label>
                      {second_show}
                    </p> */}

                    <RenderBookTicketButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (e) {
    console.log(e);
  }
};

export default MovieDetails;
//<div className="jumbotron mt-5 p-2 d-flex justify-content-center align-items-center">
