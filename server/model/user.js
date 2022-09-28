const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
  name: String,
  address: String,
  password: String,
  cpassword: String,
  email: { type: String, required: true },
  contact_number: Number,
  date_of_birth: { type: Date },
  age: {
    type: Number,
    default: function () {
      return getAge(this.date_of_birth);
    },
  },
  user_type: { type: String, default: "user" },
  tickets: [
    {
      movie: String,
      date: String,
      time_slot: String,
      tickets: String,
      seats: String,
      price: Number,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// for calculating age of the user from date of birth
function getAge(bod) {
  var today = new Date();
  //var birthDate = new Date(dateString);
  var age = today.getFullYear() - bod.getFullYear();
  var m = today.getMonth() - bod.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bod.getDate())) {
    age--;
  }
  return age;
}

//Hashing passwords
//not using arrow fun as we need tu use this (i.e not using callback function)
User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//generating token
User.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("user", User);
