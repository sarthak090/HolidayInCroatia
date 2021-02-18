var express = require('express');
var router = express.Router();
const db = require("../models")
const {ensureAuthenticated} = require("../config/auth")


/* GET home page. */
//db.Gfs


router.get('/', function(req, res, next) {
  db.Order.find({}).then((r)=>{
    
    res.send(r);

  })
});

router.get('/contactt', function(req, res, next) {
  db.Contact.find({}).then((r)=>{
    
    res.send(r)

  })
});

router.get('/contact', function(req, res, next) {
  db.Contact.find({}).then((r)=>{
    
    res.render("contact/view-contact",{user:req.user,post:r})

  })
});



router.get('/contact/delete/:id', function(req, res, next) {
  db.Contact.findByIdAndDelete(req.params.id).then((r)=>{
    
    res.redirect("/api/order/contact")

  })
});

router.post('/contact', async(req, res, next) =>{
  let body = req.body

  const userName =await db.User.findById(body.author.id).then((r)=>r.username)
  body.author.username=userName
  db.Contact.create(body).then((resp)=>{
    console.log(resp)
    res.send({
      status:200,
      send:true
    })
  }).catch((err)=>{
    if(err){
      res.send({
      status:503,

        send:false
      })
    }
  })


  // db.Contact.find({}).then((r)=>{
    
  //   res.send(r);

  // })
});

router.post('/',  async(req, res, next)=> {
  console.log(req.body)
   db.Hotels.findById(req.body.hotel_id).then(async(r)=>{
       const {title} =r
      //  const id = req.user._id;
      //  const username = await db.User.findById(id).then(r => {
      //    return r.username;
      //  });
      //  const author={
      //      id,username
      //  }
        const sed ={...req.body,title}
        res.send(sed);
    })
   
   

    // db.Order.find({}).then((r)=>{
      
    //   res.send(r);
  
    // })
  });

  
router.post('/contact',  async(req, res, next)=> {
  console.log(req.body)
   db.Hotels.findById(req.body.hotel_id).then(async(r)=>{
       const {title} =r
      //  const id = req.user._id;
      //  const username = await db.User.findById(id).then(r => {
      //    return r.username;
      //  });
      //  const author={
      //      id,username
      //  }
        const sed ={...req.body,title}
        res.send(sed);
    })
   
   

    // db.Order.find({}).then((r)=>{
      
    //   res.send(r);
  
    // })
  });
module.exports = router;
