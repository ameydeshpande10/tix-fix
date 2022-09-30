// importing modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Show = require("../model/show");

// importing from files
const User = require("../model/user");
const movie = require("../model/movie");

require("dotenv").config();

// sign up user
exports.PostSignUp = async (req, res) => {
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
exports.PostLogIn = async (req, res) => {
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

// logout (using middleware)
exports.GetLogOut = async (req, res) => {
  try {
    if (req.rootUser) {
      res.clearCookie("jwtoken", { path: "/" });
      res.clearCookie("loggedIn");
      res.clearCookie("email");
      res.status(200).send("logged out");
    }
  } catch (error) {
    res.status(200).send(error.message);
  }
};

// to delete user
exports.GetDeleteUser = async (req, res) => {
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

// To get details (using middleware)
exports.GetDetails = async (req, res) => {
  try {
    res.send(req.rootUser);
  } catch (error) {
    res.send({ message: "error in getting user details" });
  }
};

// To get tickets (using middleware)
exports.GetTickets = async (req, res) => {
  try {
    res.send(req.rootUser.tickets);
  } catch (error) {
    res.send({ message: error });
  }
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

// Reset password verify "/reset-password/:id/:token",
exports.GetResetPassword = async (req, res) => {
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

// Reset password
exports.PostResetPassword = async (req, res) => {
  const id = req.body.id;
  const token = req.body.token;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if (password !== cpassword) {
    console.log("password not match");
    return res.send({ status: "Password do not match!" });
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    console.log("user not found");
    return res.send({ status: "User not found!" });
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
    res.send({ email: verify.email, status: "Password changed!" });
  } catch (err) {
    res.send(err);
  }
};

// update database add ticket
let ticket;
let otp;
var seatbooked = [];
exports.PostUpdateTicket = async (req, res) => {
  try {
    var id = req.body.id;
    var user = req.rootUser;

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

//confirm otp and update ticket (using middleware)
exports.PostConfirmOTP = async (req, res) => {
  try {
    var newOTP = req.body.otp;
    var user = req.rootUser;

    if (newOTP == otp.toString()) {
      //updating seats database
      let id = req.body.id;

      try {
        for (var i = 0; i < seatbooked.length; i++) {
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

      user.tickets.push(ticket);
      user.save();
      sendTicketEmail(user);
      //res.send({ message: "ticket Added" });
      res.json({ status: "seat booked Ticket send on Email" });
      ticket = null;
      otp = null;
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
  let movie = ticket.movie;
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
