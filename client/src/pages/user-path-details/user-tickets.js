import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user-tickets.css";

export const UserTickets = () => {
  const [tickets] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function getTickets(e) {
      try {
        await axios
          .get("http://localhost:3001/user/get-tickets")
          .then((res) => {
            for (let index = 0; index < res.data.length; index++) {
              tickets[index] = res.data[index];
            }
            setHasLoaded(true);
          });
      } catch (error) {
        console.log(error);
      }
    }

    getTickets();
  });

  const RenderTicket = () => {
    var count = 1;
    return tickets.map((ticket) => (
      <div className="col cc" key={count++}>
        <div className="row ">
          <article className="cards fl-left">
            <div className="date">
              <time dateTime="23th feb">
                <span key={ticket.date}>{ticket.date}</span>
              </time>
            </div>
            <section className="card-cont">
              <h2 key={ticket.movie}>{ticket.movie}</h2>
              <div className="even-date">
                <time>
                  <span key={ticket.date}>{ticket.date}</span>
                  <br></br>
                  <span key={ticket.time_slot}> {ticket.time_slot}</span>
                </time>
              </div>

              <div className="even-info r-3"> Seat no. {ticket.seats}</div>
              <div className="col-5 ">
                <h3>{ticket.tickets}</h3>
              </div>
              <div className="col-5 ">
                <h3>Total: &nbsp;{ticket.price}</h3>
              </div>
            </section>
          </article>
        </div>
      </div>
    ));
  };

  if (hasLoaded === true) {
    return (
      <div className="container h-100">
        <h1>Tickets</h1>

        <div className="row">
          <RenderTicket />
        </div>
      </div>
    );
  }
};
