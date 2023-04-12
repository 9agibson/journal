

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-aaron:test123@cluster0.qd0l2c9.mongodb.net/blogDB");

const homeStartingContent = "This is a blog web app created by me, Aaron Gibson. For more information check out the about section.";
const aboutContent = "This app is created using multiple languages and frameworks. This includes HTML, CSS, Bootstrap, Javascript, Node.js, EJS, Express.js, Lodash, and it is connected to a Mongo Database using Mongoose.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



// post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find().then(function(posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  
  res.redirect("/");

});

app.get("/posts/:postID", function(req, res){
  const requestedID = _.lowerCase(req.params.postID);

  Post.find().then(function(posts){
  posts.forEach(function(post){
    const storedID = _.lowerCase(post._id);

    if (storedID === requestedID) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
