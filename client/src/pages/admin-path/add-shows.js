import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const AddShows = () => {
  const movieId = useParams();
  let status = true;
  // console.log(movieId)
  const [data, setData] = useState({
    movieId: movieId.id,
    show: "",
    time: "",
    platinumRows: "",
    platinumRate: "",
    goldRows: "",
    goldRate: "",
    silverRows: "",
    silverRate: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  //console.log(data);
  if (
    data.show.length !== 0 &&
    data.platinumRows.length !== 0 &&
    data.goldRows.length !== 0 &&
    data.silverRows.length !== 0 &&
    data.silverRate.length !== 0 &&
    data.goldRate.length !== 0 &&
    data.platinumRate !== 0
  ) {
    status = false;
  }
  const postData = async (e) => {
    e.preventDefault();
    const { movieId, show, time, platinumRate, goldRate, silverRate } = data;
    const platinumRows = platinumSeats;
    const goldRows = goldSeats;
    const silverRows = silverSeats;
    const res = await fetch("/shows/add-shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
        show,
        time,
        platinumRows,
        platinumRate,
        goldRows,
        goldRate,
        silverRows,
        silverRate,
      }),
    });
    const result = await res.json();
    //console.log(result);
    reset();
    status = true;
  };

  // reset()

  const reset = (e) => {
    let inputs = document.querySelectorAll("input");
    setData({
      ...data,
      movieId: movieId.id,
      show: "",
      time: "",
      platinumRows: "",
      platinumRate: "",
      goldRows: "",
      goldRate: "",
      silverRows: "",
      silverRate: "",
    });
    status = true;
    inputs.forEach((input) => (input.value = ""));
  };

  const createMovieSeats = (rows, length, tclass) => {
    tclass = tclass.toLowerCase();
    let start = "A";
    const section = [];
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= length; j++) {
        if (tclass === "silver") {
          section.push("S-" + start + j);
        }
        if (tclass === "gold") {
          section.push("G-" + start + j);
        }
        if (tclass === "platinum") {
          section.push("P-" + start + j);
        }
      }
      start = String.fromCharCode(start.charCodeAt(0) + 1);
    }
    return section;
  };

  const platinumSeats = createMovieSeats(data.platinumRows, 10, "Platinum");
  const goldSeats = createMovieSeats(data.goldRows, 10, "Gold");
  const silverSeats = createMovieSeats(data.silverRows, 10, "Silver");

  // useEffect(() => {
  //   var today = new Date().toISOString().split("T")[0];
  //   document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  // });

  return (
    <div className="container justify-content-center">
      <div className="mt-2">
        <div className="p-5">
          <table className="table" method="post">
            <h1>Add Shows</h1>
            <tr>
              <div className="row p-2 align-items-center justify-content-between">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    Show Date
                  </span>
                  <input
                    type="date"
                    name="setTodaysDate"
                    className="form-control"
                    onChange={handleInputs}
                    required
                  />
                </div>
                <td></td>
                <div class="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    Show timing
                  </span>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    onChange={handleInputs}
                    required
                  />
                </div>
              </div>
            </tr>

            <div className="row p-2 align-items-center justify-content-between">
              <div class="input-group ">
                <input
                  type="text"
                  name="platinumRows"
                  className="form-control"
                  placeholder="Platinum screen rows"
                  aria-label="Username"
                  onChange={handleInputs}
                  required
                />
                <span className="input-group-text">&#8377;</span>
                <input
                  type="text"
                  name="platinumRate"
                  className="form-control"
                  placeholder="Platinum screen rate"
                  aria-label="Server"
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div className="row p-2 align-items-center justify-content-between">
              <div class="input-group ">
                <input
                  type="text"
                  name="goldRows"
                  className="form-control"
                  placeholder="Gold screen rows"
                  aria-label="Username"
                  onChange={handleInputs}
                  required
                />
                <span className="input-group-text">&#8377;</span>
                <input
                  type="text"
                  name="goldRate"
                  className="form-control"
                  placeholder="Gold screen rate"
                  aria-label="Server"
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div className="row p-2 align-items-center justify-content-between">
              <div class="input-group ">
                <input
                  type="text"
                  name="silverRows"
                  className="form-control"
                  placeholder="Silver screen rows"
                  aria-label="Username"
                  onChange={handleInputs}
                  required
                />
                <span className="input-group-text">&#8377;</span>
                <input
                  type="text"
                  name="silverRate"
                  className="form-control"
                  placeholder="Silver screen rate"
                  aria-label="Server"
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div className="align-items-center justify-content-between d-flex p-2">
              <div className="">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={postData}
                  disabled={status}
                >
                  Submit
                </button>
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};
