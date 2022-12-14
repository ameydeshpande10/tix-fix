const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// for cross origin access
var cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userid",
    secret: "tms",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 15 * 1,
    },
  })
);

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const axios = require("axios");

// axios
//   .post(
//     "https://bfhldevapigw.healthrx.co.in/bfl-api-challenge/challenge-final",
//     {
//       b_email: "YW1leWRlc2hwYW5kZTk0QGdtYWlsLmNvbQ==",
//       b_name: "RGVzaHBhbmRlIEFtZXkgU2FudG9zaA==",
//       b_reg_no: "MjIwMzQwMTIwMDU1",
//       email: "ameydeshpande94@gmail.com",
//       name: "Deshpande Amey Santosh",
//       personal_code: "REDIS",
//       reg_no: "220340120055",
//     }
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//user routes
app.use(userRoutes);

//movie routes
app.use(movieRoutes);

app.set("view engine", "ejs");

//Connecting to MongoDB atlas
db.connect();

// Listening on port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
