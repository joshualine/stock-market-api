const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);

module.exports = User;