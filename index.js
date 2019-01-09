const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('./config/config');
require("./models/User");
require('./Services/passport');


mongoose.connect(config.mongoDB);

const app = express();

app.use(
    cookieSession({
        maxAge:30 * 24 * 60 * 1000,
        keys : [config.cookieKey]
    })
);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(passport.initialize());
app.use(passport.session());

require('./Routes/authRoutes')(app);
require('./Routes/spotifyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);