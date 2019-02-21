const SpotifyController = require('../controllers/SpotifyController');
const mongoose = require('mongoose');
const User =  mongoose.model("users");
const utils = require("../utils/Utils");

const updateLastRequestDate = async (id, time) => {
    try{
        const existingUser = await User.findOneAndUpdate({spotifyID : id},
            {$set:{lastView:time}},
            (err,usr) => {
                if(err){
                    console.log(err);
                }
            });

        if(existingUser){
            next();
            return;
        }
    }catch (e) {
        console.log(e);
    }
};

module.exports = async (req, res, next) => {
    const d = new Date();
    const ms = Math.round(d.getTime());

    if(!req.user) next();
    console.log(req.user);
    const isTokenExpired = req.user.tokenExpires - ms;
    console.log(isTokenExpired);
    if(isTokenExpired <= 0){
        const con = new SpotifyController(req.user);
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
                next();
                return;
            }
        }catch (e) {
            console.log(e);
        }

    }else{
        //make a day before since releases are by general day not specific MS and will miss same day
        d.setDate(d.getDate() -1);
        updateLastRequestDate(req.user.spotifyID, d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate());
    }

    next();
};
