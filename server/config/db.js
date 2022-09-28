const mongoose = require("mongoose");
const { db } = require("../model/user");
require("dotenv").config();

// MongoDB atlas connection

module.exports.connect = function () {
  const URI = process.env.URI;
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => console.log(error));
};
