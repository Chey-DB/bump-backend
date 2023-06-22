const Settings = require("../models/Settings");

const passport = require("passport");


const router = require("express").Router();

const authRouter = router;

// Google OAuth login route
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);
// Google OAuth callback route
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/register",
  }),
  async (req, res) => {
    console.log("You have successfully logged in!");
    const userSettings = await Settings.findOne({ user_id: req.user._id });
    if (userSettings) {
      res.redirect("http://localhost:5173/loading");
    } else
    res.redirect("http://localhost:5173/settings");
  }
);

// Logout route
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    console.log("You have successfully logged out!");
    console.log(req.session, req.user);

    if (err) {
      return next(err);
    }
    console.log(err);
  });
});

// Check if user is logged in
authRouter.get("/checkUser", (req, res) => {
  if (req.user) {
    res.send(req.user);
    } else {
      console.log("No user found at backend");
      res.send("No user found");
    }
});

module.exports = authRouter;
