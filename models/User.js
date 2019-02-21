const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    spotifyID : String,
    spotifyAccessToken : String,
    spotifyRefreshToken : String,
    spotifyName : String,
    tokenExpires : String,
    storeTime : String,
    lastView : String
});

mongoose.model('users',userSchema);