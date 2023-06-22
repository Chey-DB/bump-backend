const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")

const client = require("./database/setup");

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const googleUsersRouter = require("./routes/googleUsersRouter");
const localUsersRouter = require("./routes/localUsersRouter");
const settingsRouter = require("./routes/settingsRouter");
const journalsRouter = require("./routes/journalsRouter");
const checklistRouter = require("./routes/checklistRouter");
const calendarRouter = require("./routes/calendarRouter");
const quotesRouter = require("./routes/quotesRouter");

require("./config/passport")(passport);

const app = express();
client();

// Middleware
app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION,
    }),
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
app.use("/google-users", googleUsersRouter);
app.use("/local-users", localUsersRouter);
app.use("/settings", settingsRouter);
app.use("/posts", postsRouter);
app.use("/checklists", checklistRouter);
app.use("/journals", journalsRouter);
app.use("/calendar", calendarRouter);
app.use("/quotes", quotesRouter);

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

module.exports = app;
