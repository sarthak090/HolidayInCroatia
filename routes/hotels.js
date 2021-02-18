var express = require('express');
var router = express.Router();
const db = require("../models")
const {ensureAuthenticated,loginToEdit} = require("../config/auth")

/* GET home page. */
// List all available hotels
router.get('/', function(req, res, next) {
    db.Hotels.find({}).then((r)=>{
        res.render("posts",{posts:r,user:req.user})
    }).catch((err)=>{
        res.send("There Was an Error")
    })
});

router.get('/add-new-property', function(req, res, next) {
    res.render("add-post",{user:req.user})
  });
router.get("/all",(req,res)=>{
    db.Hotels.find({}).then((r)=>{
        res.render("posts",{posts:r,user:req.user})
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
router.get("/all-hotels",(req,res)=>{
    db.Hotels.find({}).then((r)=>{
        res.send(r)
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})

router.post('/add-new-property',ensureAuthenticated, function(req, res, next) {
    const author={
        id:req.user._id,
        username:req.user.username,
    }
    const f={...req.body,author}
    

    db.Hotels.create(f).then((r)=>{
        console.log(r)
        res.send({saveData:f})

    }).catch((err)=>{
        res.send("There Was an Error")
    })
    //const{}=req.body
    //res.render("add-post")
});


router.get("/json/:id",(req,res)=>{
    db.Hotels.findById(req.params.id).then(r=>{
        res.send(r)
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
/*
UPDATE HOTELS
*/

router.get("/edit/:id",(req,res)=>{
    db.Hotels.findById(req.params.id).then(r=>{
        res.render("edit-post",{post:r,user:req.user})
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
router.put("/edit/:id",ensureAuthenticated,(req,res)=>{
    const f=req.body

    const id = req.params.id
    const update = req.body
    let facilites=f['facilities[]']
    
    
    
    let recData={
        ...update,
        facilites
    }
    const saveData ={
        title:req.body.title,
        image:req.body.featureimg,
        property_type:req.body.property_type,
        meals:req.body.meals,
        
        price:req.body.price,
        address:req.body.address,
        ratings:req.body.ratings,
        rooms:req.body.rooms,
        guest:req.body.guest,
        size:req.body.size,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        exert:req.body.execrt,
        video:req.body.video

    }
    db.Hotels.findByIdAndUpdate(id,recData).then((r)=>{
        db.Hotels.findById(id).then(rdata=>{
            res.render("edit-post",{post:rdata,user:req.user})

            // let send = rdata;
            // send.saved = true;
            // console.log(send);
            // res.send({ ...rdata, saved: true });
        })
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
router.get("/delete/:id",ensureAuthenticated,(req,res)=>{
    console.log(req.user)
    db.Hotels.findByIdAndRemove(req.params.id).then(r=>{
        res.redirect("/api/hotels/all")
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
router.get("/:id",(req,res)=>{
    db.Hotels.findById(req.params.id).then(r=>{
        console.log(r)
        res.send(r)
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
router.get("/view/:id",(req,res)=>{
    db.Hotels.findById(req.params.id).then(r=>{
        res.render("postitem",{post:r,user:req.user})
    }).catch((err)=>{
        res.send("There Was an Error")
    })
})
/**Category Search */
router.get("/property-type/:type",(req,res)=>{
        const type = req.params.type

        db.Hotels.find({}).where("propertyType").equals(capitalizeFirstLetter(type)).then((r)=>res.send(r))
})
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = router;
