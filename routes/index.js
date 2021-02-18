var express = require('express');
var router = express.Router();
const db = require("../models")
const {ensureAuthenticated} = require("../config/auth")



/* GET home page. */
//db.Gfs


router.get('/',ensureAuthenticated, function(req, res, next) {
  db.Hotels.find({}).then(async(r)=>{
    const contact = await db.Contact.find({}).then((r)=>r)

    res.render("dashboard/index",{ posts: r,user:req.user,contact:contact})
    //res.render('index', { posts: r,user:req.user});

  })
});

module.exports = router;
