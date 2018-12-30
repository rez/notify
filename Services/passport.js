const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const User = mongoose.models('users');
const keys = require("../config/config");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify_client_id,
            clientSecret: keys.spotify_client_secret,
            callbackURL: '/auth/spotify/callback'
        },
        function(accessToken, refreshToken, expires_in, profile, done) {
            console.log(accessToken);
            User.findOne({spotifyID : profile.id})
                .then((existingUser) => {
                    if(existingUser){
                        done(null,existingUser);
                    }else{
                        new User({spotifyID: profile.id}).save()
                            .then(user => done(null,user));
                    }
                });
            // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
            //     return done(err, user);
            // });
        }
    )
);