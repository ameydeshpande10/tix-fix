import "../movies.css";
import React from "react";
import { UpcomingMovies } from "./upcoming-movies";

export const UpcomingMoviesDisplay = () => {
  return (
    <div className="container mt-5 movie_container">
      <div className="movie_cards">
        <UpcomingMovies data={"Movie Details"} />
      </div>
    </div>
  );
};
