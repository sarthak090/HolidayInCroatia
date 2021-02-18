const express = require('express'),
        axios = require("axios"),
        db = require("../models"),
        slugify = require('slugify'),
      request = require("request-promise"),
       router = express.Router()  
const {ensureAuthenticated} = require("../config/auth")

router.get("/",(req,res)=>{
    db.Post.find({}).then(r=>res.send(r))
    
})

router.get("/all",(req,res)=>{
  db.Post.find({}).then(r=>{
    res.render("blog/all-post",{posts:r,user:req.user})
  })
  
})
router.get("/add",(req,res)=>{
  //res.send("s")
  res.render("add-blog-post.ejs",{user:req.user})
})


router.post("/add/post",ensureAuthenticated,(req,res)=>{
  //res.send("s")
  const author={
    id:req.user._id,
    username:req.user.username,
}
  const post = {
    title:req.body.title,
    featureImage:req.body.featureImage,
    excerpt:req.body.excerpt,
    data:req.body.data,
    slug:slugify(req.body.title),
    author:author

  }
    db.Post.create(post).then((r)=>res.redirect("/api/post/")).catch((err)=>{
      res.statusCode(500).send({msg:"Cannot Saved"})
    })
 // res.render("add-blog-post.ejs",{user:req.user})
})


router.post("/",ensureAuthenticated,(req,res)=>{
  const author={
    id:req.user._id,
    username:req.user.username,
}
  const post = {
    title:req.body.title,
    featureImage:req.body.featureImage,
    excerpt:req.body.excerpt,
    data:req.body.data,
    slug:slugify(req.body.title),
    author:author

  }
  
  res.send(post)
 // db.Post.create()

})

router.get("/edit/:id",(req,res)=>{
  db.Post.findById(req.params.id).then((r)=>{
    
    res.render("blog/edit-blog-post",{post:r,user:req.user})

  }).catch((err)=>{
    res.send({status:404,msg:"No Post"})
  })
})


router.put("/edit/:id",(req,res)=>{
  const f=req.body

  db.Post.findByIdAndUpdate(req.params.id,f).then((r)=>{
      
    db.Post.findById(req.params.id).then((r)=>{
    
      res.render("blog/edit-blog-post",{post:r,user:req.user})
  
    }).catch((err)=>{
      res.send({status:404,msg:"No Post"})
    })

  }).catch((err)=>{
    res.send({status:404,msg:"No Post"})
  })
})


router.get("/view/:id",(req,res)=>{
  db.Post.findById(req.params.id).then((resp)=>{
    
   
      res.render("blog/view-blog",{post:resp,user:req.user})

    
    

  }).catch((err)=>{
    console.log(err)
    res.send({
      status:404,
      msg:"There was an error"
    })
  })
})

router.get("/delete/:id",ensureAuthenticated,(req,res)=>{
  
  db.Post.findByIdAndRemove(req.params.id).then(r=>{
      res.redirect("/api/post")
  }).catch((err)=>{
      res.send("There Was an Error")
  })
})
router.get("/:id",(req,res)=>{
  db.Post.findById(req.params.id).then((resp)=>{
    
    if(resp){
      res.send(resp)

    } else{
      res.send({
        status:404,
        msg:"There was an error"
      })
    }
    

  }).catch((err)=>{
    res.send({
      status:404,
      msg:"There was an error"
    })
  })
})

module.exports= router       