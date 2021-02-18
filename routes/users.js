var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")
const db = require("../models")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const passport = require("passport")
const mongoose = require("mongoose")
const {ensureAuthenticated} = require("../config/auth")
const auth = require("../middleware/auth");

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login-page',{user:req.user,user:req.user});
});

router.get("/login-next",auth,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  db.User.findById(req.user._id)
    .select("-password")
    .then(user => {
      res.json(user);
    });
})
router.get("/dashboard",ensureAuthenticated,async(req,res)=>{
  const contact = await db.Contact.find({}).then((r)=>r)

  res.render("dashboard/index",{user:req.user,contact:contact})
})

router.get("/dashboard/all-users",ensureAuthenticated,(req,res)=>{
  db.User.find({}).select("-password").then(async(resp)=>{
  const contact = await db.Contact.find({}).then((r)=>r)
  res.render("dashboard/tables",{user:req.user,users:resp,contact:contact})

  })
})


router.get('/register',  (req, res) => res.render('register',{user:req.user}));


router.post('/register', (req, res) => {
  const { name, email, password, password2,username } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2 || !username) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,username
    });
  } else {
    User.findOne({ email: email, }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          username,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          username
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/hotels/all',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Client Login From next
router.get("/all-user",(req,res)=>{
  db.User.find({}).then((r)=>res.send(r))
})
router.post('/login/next', async(req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");


  console.log(`Login Request Recevied`,req.body);
  const user = await db.User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email does't exist");
  console.log(`USER Found`);

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password Does not match");
  console.log(`PassWord Matched`);

  //Create And Assign Token
  const token = jwt.sign({ _id: user._id }, "ahjsajh");
  res.send({ loggedIn: true, token: token, user: user });
});

router.post('/register-next', (req, res) => {
  const { name, email, password, username } = req.body;

    User.findOne({ email: email, }).then(user => {
      if (user) {
          res.send({status:500,msg:"already have account"})
      } else {
        const newUser = new User({
          name,
          email,
          password,
          username
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //console.log(newUser)
            newUser
              .save()
              .then(user => {
               
                res.send({
                  status:200,
                  msg:`Account Has Been Created`
                });
              })
              .catch(err => {
                res.send({
                  status:503,
                  msg:`There was some error`
                });
              });
          });
        });
      }
    });
  
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});
async function getTitle(id){
  return await db.Hotels.findById(id).then((r)=>r.title)
}
router.put('/:id', async function(req, res, next) {
  //const title = await db.Hotels.findById(req.body.wishlist).then((r)=>r.title)
  // User.updateOne({_id:req.params.id},{$push:{wishList:req.body.wishlist}}).then((r)=>{
  //   console.log(r)
  // })

  // User.findById(req.params.id,(err,data)=>{
  //   if(err){
  //     console.log(err)
  //   }else{
   
  //     data.wishList.push(req.body.wishlist)
  //     console.log(data)
  //    console.log(mongoose.Types.ObjectId.isValid(req.body.wishlist))

  //     // data.save()
  //     res.send({saved:true})

  //   }
  // })
  db.User.findById(req.params.id,{strict:false}).then((user)=>{
  //  const wishList ={
  //   id:req.body.wishlist,
  //   title:title
  //  }
  //  console.log(wishList)

    db.User.updateOne({_id:req.params.id},{$push:{wishList:req.body.wishlist}},{strict:"false"}).then((r)=>{
      console.log(r)
      res.send({saved:true})
    }).catch((err)=>{
      if(err){
        console.log(err)
        res.send({status:503,saved:false})
      }
    })

  })
  
  
  //res.render('login-page',{user:req.user,user:req.user});
});

router.get("/verify-user",(req,res)=>{
  
})
module.exports = router;
