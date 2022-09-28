import React, { useEffect, useState } from "react";
import axios from "axios";
import { Seats } from "./seats";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import MovieDetailsIndividual from "../movie-path/movie-details/movie-details-individual";

export const TicketBooking = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const params = useParams();

  //data to post
  const [buttonPopUp, setButtonPopUp] = useState(false);

  const [ticketDate, setTicketDate] = useState();
  const [ticketTime, setTicketTime] = useState("");

  const [ticketCount, setTicketCount] = useState();
  const [hasAdded, sethasAdded] = useState(false);
  var [ShowArray] = useState([]);
  var [ShowTimings, setShowTimings] = useState([]);

  // for seat
  const [getData, setGetData] = useState([]);
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
  const [ticketFare, setTicketFare] = useState([]);
  const [unAvailableSeats, setUnAvailableSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");

  //console.log(ShowTimings);

  useEffect(() => {
    const GetShows = async () => {
      try {
        await axios
          .get(`http://localhost:3001/showdetails/${id}`, {
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
          ShowTimings.push(show.time);
        }
      });
      setShowTimings(ShowTimings);
    };
    PopulateShowTime();
  }, [ticketDate, ticketTime]);

  useEffect(
    () => {
      const getShowDetails = () => {
        //console.log(ShowArray);
        if (ShowArray !== null) {
          ShowArray.some((show) => {
            if (show.show.split("T")[0] === ticketDate)
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
    },
    [ticketTime],
    [ticketDate]
  );

  useEffect(() => {
    setShowData([]);
    setPlatinumSeats([]);
    setSilverSeats([]);
    setGoldSeats([]);
    setUnAvailableSeats([]);
    setPlatinumRate([]);
    setGoldRate([]);
    setSilverRate([]);
  }, [ticketDate]);
  //console.log(ShowTimings);
  // //Get all shows of movie
  // async function GetShows(e) {
  //   try {
  //     await axios.get(`http://localhost:3001/showdetails/${id}`).then((res) => {
  //       for (let index = 0; index < res.data.length; index++) {
  //         ShowArray[index] = res.data[index];
  //       }
  //       ShowTimings = [];
  //       ShowArray.map((show) => {
  //         if (show.show.split("T")[0] === ticketDate) {
  //           if (show.time !== null) ShowTimings.push(show.time);
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // add times to Showtimings array
  // const PopulateShowTime = () => {
  //   ShowTimings = [];
  //   ShowArray.map((show) => {
  //     if (show.show.split("T")[0] === ticketDate) {
  //       if (show.time !== null) ShowTimings.push(show.time);
  //     }
  //   });
  // };
  // PopulateShowTime();

  // show details
  // const getShowDetails = () => {
  //   if (ShowArray !== null) {
  //     ShowArray.map((show) => {
  //       if (
  //         show.show.split("T")[0] === ticketDate &&
  //         show.time === ticketTime
  //       ) {
  //         console.log(show);
  //         setShowData(show);
  //         setPlatinumSeats(show.platinumRows);
  //         setSilverSeats(show.silverRows);
  //         setGoldSeats(show.goldRows);
  //         setUnAvailableSeats(show.bookedSeats);
  //         setPlatinumRate(show.platinumRate);
  //         setGoldRate(show.goldRate);
  //         setSilverRate(show.silverRate);
  //       } else {
  //         setShowData([]);
  //         setPlatinumSeats([]);
  //         setSilverSeats([]);
  //         setGoldSeats([]);
  //         setUnAvailableSeats([]);
  //         setPlatinumRate([]);
  //         setGoldRate([]);
  //         setSilverRate([]);
  //       }
  //     });
  //   }
  // };

  //proceed to book ticket
  async function BookTicket(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/user/add-ticket", {
          id,
          date: ticketDate,
          time_slot: ticketTime,
          seats: bookedSeats,
          tickets: numberOfSeats,
        })
        .then((res) => {
          console.log(res.data);
          navigate(`/ticket-payment/${id}`);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const confirm_booking = () => {
    const calculateTotalFare = () => {
      var fare = 0;
      bookedSeats.forEach((seat) => {
        if (seat.split("-")[0] == "P") {
          fare = fare + parseInt(platinumRate);
          //console.log(fare);
        } else if (seat.split("-")[0] == "S") {
          fare = fare + parseInt(silverRate);
        } else if (seat.split("-")[0] == "G") {
          fare = fare + parseInt(goldRate);
        }
      });
      return fare;
    };
    const total = calculateTotalFare();
    console.log(total);

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

  // const RenderSeatSelect = () => {
  //   return (
  //     <div>
  //       <div className="row d-flex justify-content-center">
  //         <div className="d-flex justify-content-center">
  //           <div className="card p-2" style={{ width: "80vw" }}>
  //             <div
  //               className="card d-flex justify-content-center align-items-center"
  //               style={{ width: "68vw" }}
  //             >
  //               <h4>Platinum:{platinumRate}</h4>
  //               <Seats
  //                 values={platinumSeats}
  //                 availableSeats={availableSeats}
  //                 unAvailableSeats={unAvailableSeats}
  //                 bookedSeats={bookedSeats}
  //                 addSeat={addSeat}
  //               />
  //             </div>
  //             <div
  //               className="card d-flex justify-content-center align-items-center"
  //               style={{ width: "68vw" }}
  //             >
  //               <h4>Gold:{goldRate}</h4>
  //               <Seats
  //                 values={goldSeats}
  //                 availableSeats={availableSeats}
  //                 unAvailableSeats={unAvailableSeats}
  //                 bookedSeats={bookedSeats}
  //                 addSeat={addSeat}
  //               />
  //             </div>
  //             <div
  //               className="card d-flex justify-content-center align-items-center"
  //               style={{ width: "68vw" }}
  //             >
  //               <h4>Silver:{silverRate}</h4>
  //               <Seats
  //                 values={silverSeats}
  //                 availableSeats={availableSeats}
  //                 unAvailableSeats={unAvailableSeats}
  //                 bookedSeats={bookedSeats}
  //                 addSeat={addSeat}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="row d-flex justify-content-center">
  //         <div className="col-1">
  //           <button className="btn btn-primary">
  //             {/* onClick={confirm_booking} */}
  //             Book seats
  //           </button>
  //         </div>
  //         <div className="row text-center">
  //           <p>{bookedStatus}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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

  const movieDetails = MovieDetailsIndividual(params);
  try {
    //Movie data
    const name = movieDetails.name;
    const certification = movieDetails.certification;
    const movie_length = movieDetails.movie_length;
    const release_date = movieDetails.release_date;
    const image = movieDetails.image;
    //Show data
    const date = movieDetails.first_show;
    const second_show = movieDetails.second_show;

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
                      style={{ height: "450px", width: "400px" }}
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
                        name="birthday"
                        onChange={(e) => {
                          setTicketDate(e.target.value);
                        }}
                      />

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

                      {/* <button
                        type="input"
                        className="btn "
                        onClick={BookTicket}
                      >
                        Proceed to pay
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="row  ">
                  {/* //justify-content-center align-items-center 
                  
                  1. row d-flex justify-content-center
                  2. d-flex  justify-content-center
                  3. "card-seat " style={{ width: "80vw" }}
                  4. card-seat d-flex justify-content-center align-items-center 
                  */}
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

// {
//   ShowTimings.map((time) => {
//     return (
//       <div>
//         <input
//           className="btn btn-primary "
//           type="radio"
//           value={time}
//           name="time_slot"
//           onChange={(e) => setTicketTime(e.target.value)}
//         />
//         {time}
//       </div>
//     );
//   });
// }

{
  /* <div className="row d-flex justify-content-center">
  <div className="col-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter seats"
              value={numberOfSeats}
              onChange={(event) => setNumberOfSeats(event.target.value)}
            />
          </div>
  <div className="col-3">
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              value={ticketDate}
              onChange={(event) => setTicketDate(event.target.value)}
            />
          </div>
  <div className="col-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "30vw" }}
              onClick={showDetails}
            >
              Check Availability
            </button>
          </div>
</div>; */
}
