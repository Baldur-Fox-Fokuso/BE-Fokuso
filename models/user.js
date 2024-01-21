const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: false,
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an Email address"],
    uniqie: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    required: true,

    type: [String, "Please enter a password"],
    minLength: [
      6,
      "Minimum Password Length should be at least six characters or more ",
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
