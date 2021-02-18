const mongoose = require("mongoose")
const orderSchema =new mongoose.Schema({
    hotel:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel"
          },
          title: String,
    },
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    },
    guest:{type:Number,default:1},
    data:{
        type:String,
        
    },

    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          username: String,
    },date:{
        type:Date,
        default:Date.now
    }

})
const Order = mongoose.model("Order",orderSchema)
module.exports = Order;