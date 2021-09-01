const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const MovieSchema = new mongoose.Schema({
    title:{type:String, required:true,unique:true},
    img:{type:String},
    year:{type:String},
    likes:[{type:ObjectId, ref:"User"}],
    postedBy:{
         type:ObjectId,
         ref:"User"
        }
   
    
},
    {timestamps:true})

    module.exports=mongoose.model("Movie", MovieSchema)