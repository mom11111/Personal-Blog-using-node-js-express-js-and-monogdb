const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/myblog',{useNewUrlParser:true},(err)=>{
    if(err)
     console.log(err);

     else{
         console.log('connected to the database');
     }
});

let blogschema=mongoose.Schema({
    title:String,
    image:String,
    content:String
});

let blogpost=mongoose.model('post',blogschema);
module.exports=blogpost;