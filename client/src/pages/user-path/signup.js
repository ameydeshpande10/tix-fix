import "../../App";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [message, setMessage] = useState("");
  const [haveMessage, setHaveMessage] = useState(false);

  async function signup(e) {
    //e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/user/sign-up", {
          name,
          address,
          password,
          cpassword,
          email,
          contact_number,
          date_of_birth,
        })
        .then((res) => {
          setHaveMessage(true);
          const exists = res.status;
          if (exists === 422) {
            console.log(res);
            window.alert("Invalid Registration");
          } else if (exists === 400) {
            console.log(res);
            window.alert("already exists");
          } else {
            //console.log(res);
            setMessage(res.data);
            setTimeout(() => navigate("/Movies"), 1500);
          }
        });
    } catch (error) {
      setMessage(error.response.data.error);
      setHaveMessage(true);
      console.log(error.response.data.error);
    }
  }

  const validateData = () => {
    document.getElementById("all-check-msg").innerHTML = "";
    document.getElementById("Email-msg").innerHTML = "";
    document.getElementById("name-msg").innerHTML = "";
    document.getElementById("pass-msg").innerHTML = "";
    document.getElementById("phone-msg").innerHTML = "";
    document.getElementById("dob-msg").innerHTML = "";
    function validateNotNull() {
      if (
        name &&
        address &&
        password &&
        cpassword &&
        email &&
        contact_number &&
        date_of_birth
      ) {
        return true;
      } else {
        document.getElementById("all-check-msg").innerHTML =
          "&cross; All fields must not be empty";
      }
    }

    function validateName() {
      if (name.length < 5) {
        document.getElementById("name-msg").innerHTML =
          "&cross; Name must have atleast 5 chars";
        return false;
      } else {
        document.getElementById("name-msg").innerHTML = "";
        return true;
      }
    }

    function validateEmail() {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mailformat)) {
        return true;
      } else {
        document.getElementById("Email-msg").innerHTML =
          "&cross; Invalid email";
        return false;
      }
    }
    function validatePassword() {
      if (password.match(cpassword)) {
        var passw =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (password.match(passw)) {
          return true;
        } else {
          document.getElementById("pass-msg").innerHTML =
            "&cross; invalid password, 8 to 15 char, at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
          return false;
        }
      } else {
        document.getElementById("pass-msg").innerHTML =
          "&cross; Password does not match";
        return false;
      }
    }
    function validateContactNumber() {
      if (contact_number.length === 10) {
        return true;
      } else {
        document.getElementById("phone-msg").innerHTML =
          "&cross; Invalid contact number";
        return false;
      }
    }

    function validateDOB() {
      var d = new Date();
      var d2 = new Date(date_of_birth);

      if (d2 < d) {
        document.getElementById("dob-msg").innerHTML = "";
        return true;
      } else {
        document.getElementById("dob-msg").innerHTML =
          "&cross; Date of birth must be not today/future date";
        return false;
      }
    }

    //console.log(validateName());
    if (
      validateNotNull() &&
      validateEmail() &&
      validateName() &&
      validatePassword() &&
      validateContactNumber() &&
      validateDOB()
    ) {
      console.log("hit signup");
      signup();
    } else {
    }
  };

  // useEffect(() => {
  //   validateData();
  // });

  const RenderMessage = () => {
    if (haveMessage === true) {
      return (
        <div className="alert-info p-2" role="alert">
          {message && <div>{message}</div>}
        </div>
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center col-6 p-3 shadow mt-4 bg-white">
      <form className="form-control">
        {/* onSubmit={signup} */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Tara"
            onChange={(e) => setName(e.target.value)}
          />
          <span class="msg" id="name-msg"></span>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Marin drive, South Mumbai"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="tara@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span class="msg" id="Email-msg"></span>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span class="msg" id="pass-msg"></span>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContact_number(e.target.value)}
          />
          <span class="msg" id="phone-msg"></span>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="Date"
            className="form-control"
            onChange={(e) => setDate_of_birth(e.target.value.toString())}
          />
        </div>
        <span class="msg" id="dob-msg"></span>
        <br></br>
        <div>
          <button
            type="button"
            onClick={validateData}
            className="btn btn-primary"
          >
            Sign up
          </button>
        </div>
        <br></br>
        <div className="p-2" role="alert">
          <span class="msg" id="all-check-msg"></span>
          <RenderMessage />
        </div>
      </form>
    </div>
  );
};

export default Signup;
/*





<div
      style={{
        backgroundColor: "white",
        margin: "5% auto",
        boxShadow: "0px 0px 10px black",
        width: "40vw",
        padding: "25px",
      }}
      className="container d-flex justify-content-center "
    >
      <form className="form-control" onSubmit={signup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Tara"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Marin drive, South Mumbai"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="tara@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContact_number(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="Date"
            className="form-control"
            onChange={(e) => setDate_of_birth(e.target.value.toString())}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
        <div className="alert " role="alert">
          <div className="alert " role="alert"></div>
        </div>
      </form>
    </div>






<div className="form-group">
          <label>Date of Birth</label>
          <input
            type="Date"
            className="form-control"
            onChange={(e) => setDate_of_birth(e.target.value.toString())}
          />
        </div>


        <div className="alert " role="alert">
          {message && <div>{message}</div>}
        </div>






<div className="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
*/
