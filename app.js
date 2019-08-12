const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const ejs=require('ejs');
const methodOverride = require('method-override');
const path=require('path')
const blogpost=require('./models/blog');


app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('new');
})


app.post('/blog',(req,res)=>{
    //console.log(req.body);
  let newpost= new blogpost(req.body);
  newpost.save().then(item=>{
      console.log('item saved');
      res.redirect('/post');
  }).catch(err=>{
      console.log(err);
  })
 
})

app.get('/post',(req,res)=>{
    blogpost.find({},(err,post)=>{
        if(err)
        console.log(err);

        else{
            //console.log(post);
            res.render('show',{blogpost:post});
        }
    })
})


//find the post you want to edit
app.get('/post/view/:title',(req,res)=>{
    let title=req.params.title;
    //console.log(title);
    //console.log(typeof(title));
    blogpost.find({title:title},(err,blogpost)=>{
        if(err)
        console.log(err);

        else{
            //console.log(blogpost);
            res.render('edit',{blogpost});
        }
    })
})



app.post('/post/edit',(req,res)=>{
   // console.log(req.body);
   // console.log(req.body.title);
    blogpost.updateOne({
        title:req.body.title,
    }, {
        title:req.body.title,
        image:req.body.image,
        content:req.body.content
    },(err,docs)=>{
if(err)
console.log(err);

else{
   // console.log(docs);
   // res.render('show',{blogpost:docs});
   res.redirect('/post');
   // console.log('good');
}
    })
})




app.listen(2400,function(){
    console.log('connected');
})