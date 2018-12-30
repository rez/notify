const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    spotifyID : String
});

mongoose.model('user',userSchema);