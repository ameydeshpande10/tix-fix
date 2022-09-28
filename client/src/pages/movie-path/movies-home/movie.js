import "../movies.css";
import React from "react";
import { MovieCard } from "./movie-card";

export const Movies = () => {
  return (
    <div className="container  movie_container">
      <div className="movie_cards">
        <MovieCard data={"Movie Details"} />
      </div>
    </div>
  );
};
