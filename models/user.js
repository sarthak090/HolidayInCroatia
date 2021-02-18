const mongoose = require("mongoose");
const hotelSchema = require("./hotels")
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  aboutMe:{
    type: String,
    
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },wishList:[String],
  date: {
    type: Date,
    default: Date.now
  }
},{ strict: false });

const User = mongoose.model("User", UserSchema);

module.exports = User;