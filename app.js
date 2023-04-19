const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
const { postList } = require('./views/postList');
const { postDetails } = require('./views/postDetails');
const path = require("path");
const { PORT = 1337 } = process.env;

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    res.status(404); 
    next(`<h2>Unfortunately the page you are looking for could not be found.</h2>`);
  } else {
  res.send(postDetails(post));
    }
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
