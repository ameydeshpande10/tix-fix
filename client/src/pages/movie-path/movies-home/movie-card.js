import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MovieData from "./movie-data";
import Cookies from "js-cookie";

export function MovieCard() {
  var adminCheck = localStorage.getItem("Admin");

  const movies = MovieData();

  try {
    const allMovies = movies.data.map(function (data) {
      const id = data._id;
      const name = data.name;
      const actors_name = data.actors;
      const director = data.director;
      const image = data.image;

      const RenderBookTicketButton = () => {
        if (adminCheck === null) {
          if (Cookies.get("loggedIn") === "true") {
            return (
              <NavLink to={`/book-ticket/${id}`} className="btn-dark btn ">
                Book Tickets
              </NavLink>
            );
          }
        }
      };
      var now = new Date();
      var release_date = new Date(data.release_date);
      if (adminCheck) {
        return (
          <>
            <div key={name} className="">
              <div
                className="card mt-5 rounded "
                style={{
                  borderTopLeftRadius: "5rem",
                  borderBottomLeftRadius: "5rem",
                }}
              >
                <img
                  src={image}
                  className="card-img-top card_image p-2"
                  alt="Not found"
                />
                <div className="card-body shadow pl-4">
                  <div className="align-items-center justify-content-center p-2">
                    <p className="text-capitalize ">
                      <label className="me-2 fw-bold">
                        <h4>
                          <b>{name}</b>
                        </h4>
                      </label>
                    </p>
                    <p>
                      <label className="me-2 fw-bold">Actors:&nbsp;</label>
                      {actors_name}
                    </p>
                    <p>
                      <label className="me-2 fw-bold">Director:&nbsp;</label>
                      {director}
                    </p>
                  </div>
                  <br></br>

                  <div className="align-items-center justify-content-between">
                    <NavLink
                      to={`/moviedetails/${id}`}
                      className="btn btn-primary"
                    >
                      Movie Details
                    </NavLink>
                    <RenderBookTicketButton></RenderBookTicketButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else if (release_date <= now) {
        return (
          <>
            <div key={name} className="">
              <div
                className="card mt-5 rounded "
                style={{
                  borderTopLeftRadius: "5rem",
                  borderBottomLeftRadius: "5rem",
                }}
              >
                <img
                  src={image}
                  className="card-img-top card_image p-2"
                  alt="Not found"
                />
                <div className="card-body shadow pl-4">
                  <div className="align-items-center justify-content-center p-2">
                    <p className="text-capitalize ">
                      <label className="me-2 fw-bold">
                        <h4>
                          <b>{name}</b>
                        </h4>
                      </label>
                    </p>
                    <p>
                      <label className="me-2 fw-bold">Actors:&nbsp;</label>
                      {actors_name}
                    </p>
                    <p>
                      <label className="me-2 fw-bold">Director:&nbsp;</label>
                      {director}
                    </p>
                  </div>
                  <br></br>

                  <div className="align-items-center justify-content-between">
                    <NavLink
                      to={`/moviedetails/${id}`}
                      className="btn btn-primary"
                    >
                      Movie Details
                    </NavLink>
                    <RenderBookTicketButton></RenderBookTicketButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    });
    return [allMovies];
  } catch (e) {
    return null;
  }
}
