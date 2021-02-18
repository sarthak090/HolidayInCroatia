var mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
        title:{
            type:String            
        },  
        
        metaDescription:{
            type:String            
        }   ,   
        slug:{
            type:String
        },
        featureImage:{
            type:String
        },
        excerpt:{
            type:String            

        },
       

        data:{
            type:String            
        },author: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            username: String,
            
          }    ,
       
        
        published:{
            type:Date          
        }
       
        
});




var Post = mongoose.model('Post',postSchema);

module.exports = Post;