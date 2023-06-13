const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const client = require("./database/setup");

const postsRouter = require("./routes/postsRouter");

client();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

module.exports = app;
