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
      res.redirect("http://localhost:5173/dashboard");
    } else
    res.redirect("http://localhost:5173/settings");
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

authRouter.get("/checkUser", (req, res) => {
  console.log(req.user);
  const user = req.session.passport.user
  console.log(user);
  if (req.user) {
    res.send(req.user);
    } else {
      console.log("No user found at backend");
      res.send("No user found");
    }
});

// authRouter.get('/checkUser', (req, res) => {
//   if(req.user) {
//     // user is logged in, return some user info
//     res.send({ loggedIn: true, user: req.user });
//   } else {
//     // user is not logged in
//     res.send({ loggedIn: false });
//   }
// });


module.exports = authRouter;
