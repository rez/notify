const passport = require("passport");
const config = require("../config/config");

module.exports = (app) => {
    app.get('/auth/spotify', passport.authenticate('spotify',{
        scope: config.spotify_scopes,
        showDialog:true
    }));
    app.get(
            '/auth/spotify/callback',
            passport.authenticate('spotify'),
            (req,res) => {
                res.redirect("/dashboard");
            }
        );
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect("/");
    });
    app.get('/api/current_user',(req,res) =>{
        console.log("SDFSDFSDF");
        res.send(req.user);
    });
};