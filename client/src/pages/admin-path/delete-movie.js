import React, { useState } from "react";
import axios from "axios";
import "./admin-path.css";
//import { ConfirmDeletePopUp } from "./ConfirmDeletePopUp";

export const DeleteMovie = () => {
  const [movie_name, setMovie_name] = useState("");
  const [message, setMessage] = useState("");
  const [buttonPopUp, setButtonPopUp] = useState("false");

  const ConfirmDeletePopUp = (props) => {
    if (props.trigger === "true") {
      setTimeout(() => 2000);
      return (
        <div className="popup">
          <div className="popup-inner">
            {props.children}
            <h2> you are about to delete a movie</h2>
            <br></br>
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-danger col-10"
                  value={"false"}
                  onClick={(e) => setButtonPopUp(e.target.value)}
                  onClickCapture={deleteMovie}
                >
                  Confirm
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary col-10"
                  value={"false"}
                  onClick={(e) => setButtonPopUp(e.target.value)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  async function deleteMovie(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/movie/delete-movie", {
          movie_name,
        })
        .then((res) => {
          console.log(res);
          //console.log(res.status);
          setMessage(res.data.message);
        });
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "10% auto",
        boxShadow: "0px 0px 10px black",
        width: "30vw",
        padding: "35px",
      }}
      className="container-fluid d-flex justify-content-center"
    >
      <form>
        <h5>Remove Movie </h5>
        <br></br>
        <br></br>
        <div className="mb-3">
          <label className="form-label">Movie Name</label>
          <input
            value={movie_name}
            onChange={(e) => setMovie_name(e.target.value)}
            type="text"
            className="form-control "
          />
        </div>

        <button
          className="btn btn-primary col-12"
          type="button"
          value={"true"}
          onClick={(e) => {
            if (movie_name !== "") {
              setButtonPopUp(e.target.value);
            }
          }}
        >
          Delete Movie
        </button>
        <ConfirmDeletePopUp trigger={buttonPopUp}></ConfirmDeletePopUp>

        <div className="alert " role="alert">
          {message && <div> {message}</div>}
        </div>
      </form>
    </div>
  );
};
