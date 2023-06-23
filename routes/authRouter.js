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
    failureRedirect: "https://bump-kwkn.onrender.com/register",
  }),
  async (req, res) => {
    console.log("You have successfully logged in!");
    const userSettings = await Settings.findOne({ user_id: req.user._id });
    if (userSettings) {
      res.redirect("https://bump-kwkn.onrender.com/loading");
    } else
    res.redirect("https://bump-kwkn.onrender.com/settings");
  }
);

// Logout route
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    console.log("You have successfully logged out!");
    console.log(req.session, req.user);
    res.status(200).send(req.session)
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
