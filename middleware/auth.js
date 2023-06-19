module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("http://localhost:5173");
        }
    },

    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("http://localhost:5173/dashboard");
        } else {
            return next();
        }
    }
}

