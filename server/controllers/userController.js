// importing modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Show = require("../model/show");

let express = require("express");
let bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

require("dotenv").config();

// importing from files
const User = require("../model/user");
const movie = require("../model/movie");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

//setup express app
let app = express();

// sign up user
exports.SignUp = async (req, res) => {
  const {
    name,
    address,
    email,
    contact_number,
    password,
    cpassword,
    date_of_birth,
  } = req.body;
  //check for fields validation
  if (
    !name ||
    !email ||
    !contact_number ||
    !password ||
    !cpassword ||
    !date_of_birth
  ) {
    return res.status(422).json({ error: "please fill all required fields" });
  }
  //if user is unique
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password not matching" });
    } else {
      //if not exists
      const user = new User({
        name,
        address,
        email,
        contact_number,
        password,
        cpassword,
        date_of_birth,
      });
      //calls hashing method before saving
      await user.save();
      res.status(201).json("user registered successfully");
    }
  } catch (err) {
    console.log(err.response);
  }
};

// login user
exports.LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    } else {
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.cookie("email", email, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        jwt.sign(
          {
            data: email,
          },
          "secret",
          { expiresIn: "1h" }
        );
        if (!isMatch) {
          res.send({ message: "Invalid credentials" });
          //res.status(400).json({ error: "Invalid credentials" });
        } else if (userLogin.user_type === "Admin") {
          res.status(201).json({ message: "Admin Login", user_type: "Admin" });
          //res.status(201).json({ message: "Admin Login" });
        } else {
          var jsonContent = JSON.stringify(userLogin);
          var jsonContentParsed = JSON.parse(jsonContent);
          var name = jsonContentParsed["name"];

          res.json({ message: "Login successful", name: name });
        }
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// To get details
exports.GetDetails = async (req, res) => {
  try {
    var email = req.cookies.email;

    var user = await User.findOne({
      email: email,
    });
    var userJson = JSON.stringify(user);
    res.send(user);
  } catch (error) {
    res.send({ message: "error in getting user details" });
    //res.status(400).json({ error: "error in getting user details" });
  }
};

// logout
exports.LogOut = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.clearCookie("loggedIn");
  res.clearCookie("email");
  res.status(200).send("logout");
};

// get user name
exports.GetUserName = async (req, res) => {
  try {
    var email = req.cookies.email;
    var myUser = await User.findOne({
      email: email,
    });

    var jsonContent = JSON.stringify(myUser);
    var jsonContentParsed = JSON.parse(jsonContent);
    var name = jsonContentParsed["name"];
    res.end(name);
  } catch (error) {
    res.send({ message: error });
  }
};

// to delete user
exports.delete_user = async (req, res) => {
  try {
    var email = req.body.email;
    var myUser = await User.findOne({
      email: email,
    })
      .remove()
      .exec();
    res.send("user deleted");
  } catch (error) {
    res.send({ message: error });
  }
  console.log(myUser);
  res.end();
};

// To get tickets
exports.GetTickets = async (req, res) => {
  try {
    var email = req.cookies.email;
    var myUser = await User.findOne({
      email: email,
    });
    var userJson = JSON.stringify(myUser);

    res.send(myUser.tickets);
    //res.send(userJson.tickets);
  } catch (error) {
    res.send({ message: error });
  }
};

//reset password
exports.reset_password = async (req, res) => {
  try {
    var email = req.body.email;
    var myUser = await User.findOne({
      email: email,
    });
    if (!myUser) {
      res.status(200).send({
        message: "Password incorrect!",
      });
    } else {
      res.status(200).send({
        message: "Email to reset password send.",
      });
    }
    console.log(myUser);
  } catch (error) {
    res.send({ message: error });
  }
  res.end();
};

// forgot password
exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ message: "User not found!" });
    }
    const secret = process.env.KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });
    //const link = `http://localhost:5000/reset-password/${user._id}/${token}`;
    const link = `http://localhost:3000/reset_password/${user._id}/${token}`;
    //
    http: var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grp43acts@gmail.com",
        pass: "xroxepntlakbaoyq",
      },
    });

    var mailOptions = {
      from: "grp43acts@gmail.com",
      to: user.email,
      subject: "Reset password",
      text: link,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({
          message: "Email send",
        });
        res.end();
      }
    });
  } catch (err) {
    console.error(err);
  }
};

//router.get("/reset-password/:id/:token",
exports.ResetPasswordGet = async (req, res) => {
  const { id, token } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.send({ message: "User not found!" });
  } else {
    const secret = process.env.KEY + user.password;
    try {
      const verify = jwt.verify(token, secret);
      res.send({ email: verify.email, message: "verified" });
    } catch (err) {
      res.send("Not verified");
    }
  }
};

//router.post("/reset-password/:id/:token",urlencodedParser,
exports.ResetPasswordPost = async (req, res) => {
  const id = req.body.id;
  const token = req.body.token;

  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if (password !== cpassword) {
    console.log("password not match");
    return res.send({ status: "Password do not match! 2" });
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    console.log("user not found");
    return res.send({ status: "User not found! 2" });
  }
  const secret = process.env.KEY + user.password;
  try {
    const verify = jwt.verify(token, secret);
    const encPassword = await bcrypt.hash(password, 12);
    const encCpassword = await bcrypt.hash(cpassword, 12);
    await User.findByIdAndUpdate(id, {
      password: encPassword,
      cpassword: encCpassword,
    });
    res.send({ email: verify.email, status: "verified 2" });
    console.log("pass updated");
  } catch (err) {
    res.send("Not verified 2");
  }
};

// update database add ticket
let ticket;
let otp;
var seatbooked = [];
exports.UpdateTicket = async (req, res) => {
  try {
    console.log("in update ticket");
    var email = req.cookies.email;
    var id = req.body.id;
    var user = await User.findOne({
      email: email,
    });

    var cmovie = await movie.findOne({
      _id: id,
    });

    let seatString = "";
    for (let index = 0; index < req.body.seats.length; index++) {
      seatbooked.push(req.body.seats[index]);
      seatString += ", " + req.body.seats[index];
    }

    ticket = {
      movie: cmovie.name,
      date: req.body.date,
      time_slot: req.body.time_slot,
      tickets: req.body.tickets,
      seats: seatString,
      price: req.body.price,
    };
    console.log(ticket);

    otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    http: var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grp43acts@gmail.com",
        pass: "xroxepntlakbaoyq",
      },
    });

    var mailOptions = {
      from: "grp43acts@gmail.com",
      to: user.email,
      subject: "OTP payment confirmation",
      text: otp.toString(),
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.end({
          message: "Email send",
        });
      }
    });
    res.end();
  } catch (error) {
    res.send({ message: error });
  }
};

//confirm otp and update ticket
exports.ConfirmOTP = async (req, res) => {
  try {
    var email = req.cookies.email;
    var newOTP = req.body.otp;
    var user = await User.findOne({
      email: email,
    });

    if (newOTP == otp.toString()) {
      console.log("OTP matched");

      //updating seats database
      let id = req.params.id;
      //let bookedSeats = ticket.seats;

      try {
        for (var i = 0; i < seatbooked.length; i++) {
          //console.log("adding");
          await Show.findOneAndUpdate(
            {
              _id: id,
            },
            {
              $push: {
                bookedSeats: seatbooked[i],
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
      res.json({ status: "seat booked" });

      console.log("Seat booked");
      //adding ticket to user
      user.tickets.push(ticket);
      user.save();
      console.log("before send email");
      sendTicketEmail(user);
      console.log("After send email");
      res.send({ message: "ticket Added" });
    } else {
      res.send({ message: "Payment Failed" });
      console.log("OTP does NOT matched");
    }
    res.end();
  } catch (error) {
    res.end({ message: error });
  }
};

function sendTicketEmail(user) {
  console.log("in send ticket email");
  console.log(user);
  let movie = ticket.movie;
  console.log(ticket.movie);
  let date = ticket.date;
  let time = ticket.time_slot;
  let seats = ticket.seats;
  let totalPrice = ticket.price;

  http: var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "grp43acts@gmail.com",
      pass: "xroxepntlakbaoyq",
    },
  });

  var mailOptions = {
    from: "grp43acts@gmail.com",
    to: user.email,
    subject: "Ticket Booked",
    text: `Ticket for ${movie} booked`,
    html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        
      </head>
      <body>
        <h1>Ticket Confirm <h1> 
        <br></br>
        <p>
        Movie : ${movie}
        </p>
        <p>
        Date : ${date}
        </p>
         <p>
        Time : ${time}
        </p>
        <p>
        Seat : ${seats}
        </p>
        <p>
        Total price : ${totalPrice}
        </p> 
      </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Ticket send on Email");
    }
  });
}
