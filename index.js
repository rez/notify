const express = require('express')
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
app.use(passport.initialize());
app.use(passport.session());
require('./Routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);