import React, { useEffect, useState } from "react";
import axios from "axios";
import { Seats } from "./seats";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import MovieDetailsIndividual from "../movie-path/movie-details/movie-details-individual";

export const TicketBooking = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const params = useParams();

  const [ticketDate, setTicketDate] = useState();
  const [ticketTime, setTicketTime] = useState("");

  var [ShowArray] = useState([]);
  var [ShowTimings, setShowTimings] = useState([]);

  // for seat

  const [showData, setShowData] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  // const [ticketDate, setTicketDate] = useState(
  //   new Date().toISOString().slice(0, 10)
  // );
  const [platinumSeats, setPlatinumSeats] = useState([]);
  const [silverSeats, setSilverSeats] = useState([]);
  const [goldSeats, setGoldSeats] = useState([]);
  const [platinumRate, setPlatinumRate] = useState([]);
  const [goldRate, setGoldRate] = useState([]);
  const [silverRate, setSilverRate] = useState([]);

  const [unAvailableSeats, setUnAvailableSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");

  //console.log(ShowTimings);

  useEffect(() => {
    const GetShows = async () => {
      try {
        await axios
          .get(`/shows/show-details/${id}`, {
            date: ticketDate,
          })
          .then((res) => {
            for (let index = 0; index < res.data.length; index++) {
              ShowArray[index] = res.data[index];
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    GetShows();

    const PopulateShowTime = () => {
      ShowTimings = [];
      ShowArray.map((show) => {
        if (show.show.split("T")[0] === ticketDate) {
          // console.log(show.time);
          // console.log(Date().toLocaleString().split(" ")[4]);
          // console.log(Date().toLocaleString().split(" ")[4] < show.time);
          if (Date().toLocaleString().split(" ")[4] < show.time) {
            ShowTimings.push(show.time);
          }
        }
        return null;
      });
      setShowTimings(ShowTimings);
    };
    PopulateShowTime();
  }, [ticketDate, ticketTime]);

  useEffect(() => {
    const getShowDetails = () => {
      //console.log(ShowArray);
      if (ShowArray !== null) {
        ShowArray.some((show) => {
          if (show.show.split("T")[0] === ticketDate) {
            if (show.time === ticketTime) {
              setShowData(show);
              setPlatinumSeats(show.platinumRows);
              setSilverSeats(show.silverRows);
              setGoldSeats(show.goldRows);
              setUnAvailableSeats(show.bookedSeats);
              setPlatinumRate(show.platinumRate);
              setGoldRate(show.goldRate);
              setSilverRate(show.silverRate);
              return true;
            } else {
              setShowData([]);
              setPlatinumSeats([]);
              setSilverSeats([]);
              setGoldSeats([]);
              setUnAvailableSeats([]);
              setPlatinumRate([]);
              setGoldRate([]);
              setSilverRate([]);
              return false;
            }
          }

          return false;
        });
      } else {
        setShowData([]);
        setPlatinumSeats([]);
        setSilverSeats([]);
        setGoldSeats([]);
        setUnAvailableSeats([]);
        setPlatinumRate([]);
        setGoldRate([]);
        setSilverRate([]);
      }
    };

    getShowDetails();
  }, [ShowArray, ticketDate, ticketTime]);

  // useEffect(() => {
  //   setShowData([]);
  //   setPlatinumSeats([]);
  //   setSilverSeats([]);
  //   setGoldSeats([]);
  //   setUnAvailableSeats([]);
  //   setPlatinumRate([]);
  //   setGoldRate([]);
  //   setSilverRate([]);
  // }, [ticketDate]);

  const confirm_booking = () => {
    const calculateTotalFare = () => {
      var fare = 0;
      bookedSeats.forEach((seat) => {
        if (seat.split("-")[0] === "P") {
          fare = fare + parseInt(platinumRate);
          //console.log(fare);
        } else if (seat.split("-")[0] === "S") {
          fare = fare + parseInt(silverRate);
        } else if (seat.split("-")[0] === "G") {
          fare = fare + parseInt(goldRate);
        }
      });
      return fare;
    };
    const total = calculateTotalFare();

    try {
      if (bookedSeats.length > 0) {
        axios
          .post("http://localhost:3001/user/add-ticket", {
            id,
            date: ticketDate,
            time_slot: ticketTime,
            seats: bookedSeats,
            tickets: numberOfSeats,
            price: total,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
    setBookedStatus("You have successfully booked the following seats:");
    setUnAvailableSeats([...unAvailableSeats, ...bookedSeats]);
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + " ";
      });
    });
    // setTicketFare(calculateTotalFare())
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    setAvailableSeats(newAvailableSeats);
    setBookedSeats("");
    setNumberOfSeats(0);
    navigate(`/ticket-payment/${showData._id}`);
  };

  //add seats
  const addSeat = (event) => {
    if (numberOfSeats && !event.target.className.includes("disabled")) {
      const seatsToBook = parseInt(numberOfSeats, 10);
      if (bookedSeats.includes(event.target.innerText)) {
        const newAvailable = bookedSeats.filter(
          (seat) => seat !== event.target.innerText
        );
        setBookedSeats(newAvailable);
      } else if (bookedSeats.length < numberOfSeats) {
        setBookedSeats([...bookedSeats, event.target.innerText]);
      } else if (bookedSeats.length === seatsToBook) {
        bookedSeats.shift();
        setBookedSeats([...bookedSeats, event.target.innerText]);
      }
    }
  };

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  });

  const movieDetails = MovieDetailsIndividual(params);
  try {
    //Movie data
    const name = movieDetails.name;
    const certification = movieDetails.certification;
    const movie_length = movieDetails.movie_length;
    const release_date = movieDetails.release_date;
    const image = movieDetails.image;

    return (
      <>
        <div className="conatiner p-2  d-flex justify-content-center align-items-center">
          <div className="conatiner  ">
            <div className="cards">
              <div className="form-control">
                <div className="row">
                  <div className="col  d-flex ">
                    <img
                      src={image}
                      className="card-img "
                      style={{ height: "600px", width: "500px" }}
                      alt="..."
                    />
                  </div>
                  <div className="col mt-4">
                    <div className="card-body h-50">
                      <p
                        className="card-title"
                        style={{ textTransform: "capitalize" }}
                      >
                        <h2>{name}</h2>
                      </p>
                      <br></br>
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
                          Release Date:&nbsp;
                        </label>
                        {release_date}
                      </p>
                      <hr className="border border-primary border-3 opacity-75"></hr>
                      <p className="card-text">Select Date</p>
                      <input
                        type="date"
                        id="birthday"
                        name="setTodaysDate"
                        min={new Date()}
                        onChange={(e) => {
                          setTicketDate(e.target.value);
                        }}
                      />
                      {/* <DatePicker
                        onChange={(e) => {
                          setTicketDate(e.target.value);
                        }}
                        minDate={new Date()}
                      /> */}

                      <hr className="border border-primary border-3 opacity-75"></hr>
                      <p className="card-text">Select Time</p>
                      <div className="row">
                        <div className=" col">
                          <ul>
                            {ShowTimings.map((time) => {
                              return (
                                <div>
                                  <input
                                    className="btn btn-primary "
                                    type="radio"
                                    value={time}
                                    name="time_slot"
                                    onChange={(e) =>
                                      setTicketTime(e.target.value)
                                    }
                                  />
                                  {time}
                                </div>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <hr className="border border-primary border-3 opacity-75"></hr>
                      <p className="card-text">How many tickets?</p>
                      <input
                        className="form-control"
                        type="Number"
                        id="ticketcount"
                        name="ticketcount"
                        onChange={(e) => setNumberOfSeats(e.target.value)}
                      />
                      <br></br>
                    </div>
                  </div>
                </div>
                <div className="row  ">
                  {
                    <div>
                      <div className="pl-4  d-flex justify-content-center">
                        <div className="d-flex  justify-content-center">
                          <div className="card-seat " style={{ width: "80vw" }}>
                            <div className="card-seat  justify-content-center align-items-center ">
                              <h4>Platinum:{platinumRate}</h4>
                              <Seats
                                values={platinumSeats}
                                availableSeats={availableSeats}
                                unAvailableSeats={unAvailableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat}
                              />
                            </div>
                            <div className="card-seat  justify-content-center align-items-center ">
                              <h4>Gold:{goldRate}</h4>
                              <Seats
                                values={goldSeats}
                                availableSeats={availableSeats}
                                unAvailableSeats={unAvailableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat}
                              />
                            </div>
                            <div className="card-seat  justify-content-center align-items-center ">
                              <h4>Silver:{silverRate}</h4>
                              <Seats
                                values={silverSeats}
                                availableSeats={availableSeats}
                                unAvailableSeats={unAvailableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="row d-flex justify-content-center">
                        <div className="col-1">
                          <button
                            className="btn btn-primary"
                            onClick={confirm_booking}
                          >
                            Book seats
                          </button>
                        </div>
                        <div className="row text-center">
                          <p>{bookedStatus}</p>
                        </div>
                      </div>
                    </div>
                  }
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
