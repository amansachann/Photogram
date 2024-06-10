const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

//including middleware so we can use post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    title: "Exploring the Wilderness",
    content:
      "Discover the hidden gems of nature in our latest expedition. Join us as we trek through lush forests and majestic mountains.",
    author: "AdventureSeeker87",
    imageUrl:
      "https://images.unsplash.com/photo-1622480510913-a2418017b565?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image URL
  },
  {
    id: uuidv4(),
    title: "Gourmet Delights: Foodie's Paradise",
    content:
      "Indulge your senses with delectable cuisines from around the world. From street food to fine dining, we've got your cravings covered.",
    author: "FoodieExplorer",
    imageUrl:
      "https://images.unsplash.com/photo-1529565214304-a882ebc5a8e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image URL
  },
  {
    id: uuidv4(),
    title: "Infinite Horizons: A Photographer's Journey",
    content:
      "Capture breathtaking moments in time with our photography tips and tricks. Unleash your creativity and explore new perspectives.",
    author: "Shutterbug123",
    imageUrl:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image URL
  },
  {
    id: uuidv4(),
    title: "Mindfulness in Motion: Yoga Retreat",
    content:
      "Embark on a journey of self-discovery and inner peace. Join our yoga retreat and experience harmony of mind, body, and soul.",
    author: "ZenMaster",
    imageUrl:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image URL
  },
  {
    id: uuidv4(),
    title: "Tech Trends: Innovations Unveiled",
    content:
      "Stay ahead of the curve with the latest in tech. From AI to blockchain, explore groundbreaking innovations shaping the future.",
    author: "TechGeek21",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image URL
  },
];

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((item) => id === item.id);
  res.render("edit.ejs", { post });
});

app.post("/posts/new", (req, res) => {
  let { author, title, imageUrl, content } = req.body;
  let id = uuidv4();
  posts.push({ id, author, title, imageUrl, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((item) => id === item.id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((item) => id === item.id);
  let { title, imageUrl, content } = req.body;
  post.content = content;
  post.imageUrl = imageUrl;
  post.title = title;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
