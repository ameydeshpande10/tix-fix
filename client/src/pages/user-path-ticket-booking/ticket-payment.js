import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const TicketPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  async function postOTP(e) {
    e.preventDefault();

    try {
      await axios
        .post(`http://localhost:3001/user/confirm-ticket`, {
          otp,
        })
        .then((Response) => {
          console.log("res data from ticket payment component" + Response.data);
          setMessage(Response.data.message);
          setTimeout(() => navigate("/Movies"), 1000);
        });
    } catch (error) {
      console.log(error);
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
      <form className="form-control" onSubmit={postOTP}>
        <h5>Confirm Payment</h5>
        <br></br>
        <br></br>
        <div className="mb-3">
          <label className="form-label">Enter OTP</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="form-control input-group"
          />
        </div>
        <br></br>
        <div className="align-content-center ">
          <button type="submit" className="btn btn-primary col-12">
            Confirm Payment
          </button>
        </div>
        <div className="alert" role="alert">
          {message && <div>{message}</div>}
        </div>
      </form>
    </div>
  );
};
