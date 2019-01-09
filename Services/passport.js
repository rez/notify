const passport = require('passport');
const mongoose = require('mongoose');
const SpotifyStrategy =  require('passport-spotify').Strategy;
const User =  mongoose.model("users");
const config = require("../config/config");
const utils = require("../Utils/Utils");

passport.serializeUser((user, done) => {
    done(null, user);
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
            clientID: config.spotify_client_id,
            clientSecret: config.spotify_client_secret,
            callbackURL: '/auth/spotify/callback'
        },
        async function(accessToken, refreshToken, expires_in, profile, done) {
            console.log(" LOG TOKENL " + accessToken);

            try{
               const existingUser = await User.findOneAndUpdate({spotifyID : profile.id},
                   {$set:{spotifyAccessToken:accessToken,storeTime: utils.getCurrentOrFutureTimeInMS(),
                           tokenExpires: utils.getCurrentOrFutureTimeInMS(expires_in)}},
                   (err,usr) => {
                       if(!err){
                          console.log("UPDATE TOKEN");
                       }else{
                           console.log(err);
                       }
                   });

                if(existingUser){
                    console.log("EXISTTTTTTTTN")
                    return done(null,existingUser);
                }
            }catch (e) {
                console.log(e);
            }


            try{
                const user = await new User({
                    spotifyID: profile.id,
                    spotifyAccessToken:   accessToken,
                    spotifyRefreshToken : refreshToken,
                    spotifyName : profile.displayName,
                    storeTime: utils.getCurrentOrFutureTimeInMS(),
                    tokenExpires: utils.getCurrentOrFutureTimeInMS(expires_in)
                }).save();
                return done(null,user);
            }catch (e) {
                console.log(e);
            }

        }
            // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
            //     return done(err, user);
            // });
    )
);