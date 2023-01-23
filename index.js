const RSSParser = require('rss-parser');
const express = require("express");
const reader = new RSSParser();
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")))
app.set("views", path.join(__dirname, "/public/views"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  console.log("GET /")
  reader.parseURL("https://Blog.azerty29242.repl.co/feed/all")
    .then(feed => {
      res.render("index", {
        items: feed.items
      })
    })
})

app.get("/feed/all", (req, res) => {
  console.log("GET /feed/all")
  fs.readFile("public/feeds/all.rss", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("READ public/feeds/all.rss")
      res.send(data)
      console.log("SEND public/feeds/all.rss")
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})