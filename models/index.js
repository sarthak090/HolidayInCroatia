var mongoose = require("mongoose")
 mongoose.set('debug', true);
require('dotenv').config()

const ur="mongodb+srv://sarthak:sarthak1@cluster0.p8zt4.mongodb.net/hotel?retryWrites=true&w=majority"
mongoose.connect(ur,{ useNewUrlParser: true ,useUnifiedTopology: true} );


mongoose.Promise = Promise;

module.exports.Hotels = require("./hotels")
module.exports.Post = require("./post")
module.exports.User = require("./user")
module.exports.Order = require("./Orders")
module.exports.Contact = require("./contact")