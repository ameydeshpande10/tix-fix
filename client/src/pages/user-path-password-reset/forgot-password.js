import React, { useState } from "react";
import axios from "axios";

export const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  async function forgot_password(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/user/forgot-password", {
          email,
        })
        .then((Response) => {
          setMessage(Response.data.message);
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
      <form onSubmit={forgot_password}>
        <h5>Enter Email </h5>
        <br></br>
        <br></br>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            style={{
              backgroundColor: "whitesmoke",
              //width: "35vw",
              //padding: "20px",
              color: "grey",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control "
          />
        </div>

        <button
          style={{
            width: "25vw",
            padding: "10px",
          }}
          type="submit"
          className="btn btn-primary"
        >
          Reset Password
        </button>

        <div className="alert " role="alert">
          {message && <div>Password reset link with {message}</div>}
        </div>
      </form>
    </div>
  );
};
