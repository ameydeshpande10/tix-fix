const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection
// URI = atlas
// LOCAL = local mongodb

module.exports.connect = function () {
  const URI = process.env.LOCAL;
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log(error));
};
