import React from "react";

export const Seats = (props) => {
  // style={{ width: "60vw" }}
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {props.values.map((seat) => {
        const isAvailable = props.availableSeats.includes(seat);
        const unAvailable = props.unAvailableSeats.includes(seat);
        const isBooked = props.bookedSeats.includes(seat);
        let seatClass;
        if (!isAvailable) {
          seatClass = "btn btn-primary seat-btn ";
        }
        if (unAvailable) {
          seatClass = "btn btn-danger disabled  seat-btn";
        }
        if (isBooked) {
          seatClass = "btn btn-success seat-btn ";
        }
        return (
          <div className="card-seat p-1 border-0">
            <div
              className={seatClass}
              onClick={props.addSeat}
              key={seat}
              style={{ width: "4vw" }}
            >
              {seat}
            </div>
          </div>
        );
      })}
    </div>
  );
};
