const router = require('express').Router();
const passport = require('../config/passport');
const localUserController = require('../controllers/localUserController');

const localUsersRouter = router;

localUsersRouter.post('/register', localUserController.register);
localUsersRouter.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json({ message: 'You have successfully logged in!' });
        });
    })
});


module.exports = localUsersRouter;
