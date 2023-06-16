const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");

const client = require("./database/setup");

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const journalsRouter = require("./routes/journalsRouter");
const checklistRouter = require("./routes/checklistRouter");
const calendarRouter = require("./routes/calendarRouter")

require("./config/passport")(passport);

const app = express();
client();

// Middleware
app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/checklists", checklistRouter);
app.use("/journals", journalsRouter);
app.use("/calendar", calendarRouter)

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

module.exports = app;
