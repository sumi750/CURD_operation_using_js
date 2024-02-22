const { Console } = require("console");
const express = require("express");
const moverride = require("method-override");
const app = express();


const port = 3000;
const path = require("path");
const {v4: uuidv4 } = require('uuid');

app.use(moverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   
        id: uuidv4() ,
        username: "apnaCollege",
        content: "I Love Coding"
    },
    {   
        id: uuidv4(),
        username: "sumitKumar",
        content: "Learing Backend In Web Dev"
    },
    {   
        id: uuidv4(),  
        username: "college",
        content: "Engennering"
    },
];

app.get("/", (req,res)=>{
    res.send("Serving working well");
})

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
})

app.listen(port, ()=>{
    console.log("post has been started  at ", port);
})

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id", (req,res)=>{
    let { id }= req.params;
    console.log(id);

    let  post = posts.find((p) => p.id === id);
    console.log(post);
    // res.send("Request Working");
    res.render("show.ejs", {post});
})

app.post("/posts", (req,res)=>{
   
    // console.log(req.body);
    let {username, content} = req.body;
    let id   = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

// Update Route : to update specific post
app.patch("/posts/:id", (req,res)=>{
    let { id }= req.params;  
    let newContent = req.body.content;     // for the new content
    console.log(newContent);
    let  post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
    // console.log(id); 
    console.log(" Request is Working");
    res.redirect("/posts");
    // res.send("Patch Request is Working");
})


// Edit Route : /posts/:id/edit
app.get("/posts/:id/edit", (req,res)=>{
    let { id }= req.params;
    let  post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
})


// Deelte 
app.delete("/posts/:id",(req,res)=>{
    let { id }= req.params;
    posts = posts.filter((p) => p.id !== id);
    // res.send("Deelte success");
    res.redirect("/posts");

})