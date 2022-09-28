import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
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
          console.log(Response.data);
          setMessage(Response.data.message);

          //navigate("/signin");
        });
    } catch (error) {
      // setMessage(Response.data.message);
      // navigate("/signin");
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
        <h5>Enter your Email address to reset password </h5>
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
          {message && <div>{message}</div>}
        </div>
      </form>
    </div>
  );
};
