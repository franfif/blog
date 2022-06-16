const express = require("express");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-francis:red1sDEAD@cluster0.igevylt.mongodb.net/blog?retryWrites=true&w=majority');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  // url: String
});

const Post = mongoose.model('Post', postSchema);
// console.log(Post.find());
// const posts = [];



app.get("/", (req, res) => {

  Post.find({}, (err, foundPosts) => {
    res.render("home", {
      content: homeStartingContent,
      posts: foundPosts
    })
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    content: aboutContent,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    content: contactContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.get("/posts/:postName", (req, res) => {
  // const postRequired = req.params.postName.replace(/\s/g, "-").toLowerCase();
  const postRequired = req.params.postName;
  Post.findOne({ _id: postRequired }, (err, foundPost) => {
    res.render("post", {
      title: foundPost.title,
      content: foundPost.content,
      // url: foundPost.url,
    });
  })
});

app.post("/", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent,
    // url: req.body.postTitle.replace(/\s/g, "-").toLowerCase(),
  };
  newPost = new Post(post);
  newPost.save();

  res.redirect("/");
})





app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});