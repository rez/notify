const SpotifyController = require('../controllers/SpotifyController');
const mongoose = require('mongoose');
const User =  mongoose.model("users");
const utils = require("../utils/Utils");

module.exports = async (req, res, next) => {
    const d = new Date();
    const ms = Math.round(d.getTime());

    const isTokenExpired = req.user.tokenExpires - ms;
    console.log(isTokenExpired);
    if(isTokenExpired <= 0){
        const con = new SpotifyController(req.user);
        console.log(" GET NEW TOKEN");
        const response = await con.refreshAccessToken();


        try{
            const existingUser = await User.findOneAndUpdate({spotifyID : req.user.spotifyID},
                {$set:{spotifyAccessToken:response.access_token,storeTime: utils.getCurrentOrFutureTimeInMS(),
                        tokenExpires: utils.getCurrentOrFutureTimeInMS(response.expires_in)}},
                (err,usr) => {
                    if(!err){
                        console.log("UPDATE TOKEN");
                    }else{
                        console.log(err);
                    }
                });

            if(existingUser){
                console.log("EXISTTTTTTTTN")
                return;
            }
        }catch (e) {
            console.log(e);
        }

    }

    next();
};