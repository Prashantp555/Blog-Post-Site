const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Prashantp:Test01@cluster0.koxdefa.mongodb.net/BlogPostDB",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let Blogs=[];
const BlogSchema=new mongoose.Schema({
  title: String,
  post: String
});

const Blog=mongoose.model("Blog",BlogSchema);

app.get("/", function(req,res){
  let heading="HOME";
  Blog.find({}, function(err, blogs){
    res.render("home",{heading:heading,blogs:blogs, homeStartingContent:homeStartingContent});

  });
  
});

app.get("/about", function(req,res){
  let heading="ABOUT-ME";
  res.render("about",{heading:heading, aboutContent:aboutContent});
});

app.get("/contact", function(req,res){
  let heading="CONTACT ME";
  res.render("contact",{heading:heading, contactContent:contactContent});
});

app.get("/compose",function(req,res){
  let heading="COMPOSE";
  res.render("compose",{heading:heading});
});

app.post("/compose",function(req,res){
  const blog= new Blog({
    title: req.body.blogTitle,
    post: req.body.blogPost
  });
  blog.save();
  res.redirect("/");
//   let BlogPost={
//   title: req.body.blogTitle,
//   blog: req.body.blogPost
// };
// Blogs.push(BlogPost);
// res.redirect("/");
  
});

app.get("/posts/:topic", function(req,res) {
 let topic=_.lowerCase(req.params.topic);
 Blog.find({}, function(err, blogs){
 blogs.forEach(function(blog){
  let title=_.lowerCase(blog.title);
  if(title===topic){
    console.log("Match Found");
    let heading=blog.title;
    res.render("post",{heading:heading, postContent:blog.post});
  }
  else{
    console.log("Not found");
  }
 });
 });

  
 });







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
