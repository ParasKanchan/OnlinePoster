const express = require("express");
const app = express();

let port = 8080;

const {v4:uuidv4}=require("uuid");
//this will give us a function 'uuidv4()' which will create new ids

const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`App is running on ${port}`);
})

//this posts array will be our resource on which we will perform crud
let posts = [
    {
        id:uuidv4(),
    username:"Harish",
    content:"Studying"
    },
    {
        id:uuidv4(),
    username:"Nayan",
    content:"Hard Work"
    },
    {
        id:uuidv4(),
    username:"Paras",
    content:"Selected"}
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//To create new account and post we have to send two different request
//1.get-->to generate a form for info
//2.post--->to post the content etc.

//for get
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
//for post
app.post("/posts",(req,res)=>{
    //below line is called destructuring
    let {username,content}=req.body;

    let id = uuidv4();//genetating id for new post
     
    //pushing new data in posts array
    posts.push({id,username,content});

    //till now we are adding and viewing on two differnet pages...let's connect them
    res.redirect("/posts")
})

//to check complete id of post
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
    res.render("show.ejs",{post});
})

//For updation of posts
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content=newContent
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
   res.render("edit.ejs",{post});

})

//Finally creation of destroy route---Deletion
//there are other ways too but we will ceate delete btn in form tag nd then perform operation
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

