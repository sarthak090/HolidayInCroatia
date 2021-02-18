var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
        title:{
            type:String            
        },
        metaDescription:{
            type:String            
        },
        author:{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
              },
              username: String,
        },
        image:{type:String},
        galleryimg:{
            type:String
        },
        slug:{
            type:String
        },
        propertyType:[String],
        meals:[
            
        ],
        bedroom:{
            type:Number
        },
        beds:{type:Number},
        guest:{type:Number,default:1},
        bathroom:{
            type:Number
        },
        facilites:[String],
        category:[String],
        price:{
            type:Number
        },
        content:{
            type:String            
        },
        address:{
            type:String            
        },
        ratings:{
            type:Number            
        },
        rooms:{
            type:Number
        }, 
        size:{
            type:Number
        },
        checkIn:{
            type:String
        },
        checkOut:{
            type:String
        },
        exert:{
            type:String
        },
        content:{
            type:String
        },
        videos:{
            type:String
        },
        
        date:{
            type:Date          
        }
       
        
});




var Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = Hotel;
module.exports.hotelSchema = hotelSchema;