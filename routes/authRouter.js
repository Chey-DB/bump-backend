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
  (req, res) => {
    console.log("You have successfully logged in!");
    res.redirect("http://localhost:5173/loading");
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

authRouter.get("/checkUser", (req, res) => {
  console.log(req.user);
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
