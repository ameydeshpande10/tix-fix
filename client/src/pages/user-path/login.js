import "../../App";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../App";

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [haveMessage, setHaveMessage] = useState(false);
  const [status, setStatus] = useState("");

  async function postLogin(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/user/log-in", {
          email: email,
          password: password,
        })
        .then((res) => {
          setName(res.data.name);
          console.log(res.data.name);
          setMessage(res.data.message);
          setHaveMessage(true);
          setStatus(res.status);
        });
    } catch (error) {
      console.log(error);
      setHaveMessage(true);
      setMessage(error.response.data.error);
    }
  }

  const RenderMessage = () => {
    if (haveMessage) {
      if (message === "Login successful") {
        dispatch({ type: "USER", payload: true });
        Cookies.set("loggedIn", "true");
        localStorage.setItem("Name", name);
        setTimeout(() => navigate("/Movies"), 1000);

        return (
          <div className="alert alert-primary " role="alert">
            {message && <div>{message}</div>}
          </div>
        );
      } else if (status === 201) {
        localStorage.setItem("Admin", "Admin");
        console.log("Admin login successful");
        Cookies.set("loggedIn", "true");
        dispatch({ type: "ADMIN", payload: true });
        setTimeout(() => navigate("/Movies"), 1000);
      } else {
        return (
          <div className="alert alert-danger " role="alert">
            {message && <div>{message}</div>}
          </div>
        );
      }
    }
  };

  return (
    <div className="container mt-5 col-4 justify-content-center user-login p-4 bg-white shadow-lg mb-5 bg-body rounded">
      <form className="form-control col-12 border-0" onSubmit={postLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control "
          />
        </div>
        <div className="mb-3">
          <label className="form-label ">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control "
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary p-2 col-12">
          Log In
        </button>
        <br></br>
        <br></br>
        Not a user? <Link to="/sign-up"> Sign Up </Link>here
        <br></br>
        <Link to="/forgot_password">Forgot password?</Link>
        <RenderMessage />
        <></>
      </form>
    </div>
  );
};
