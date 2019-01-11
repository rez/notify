const axios = require('axios');
const bodyParser = require('body-parser')
const requireLogin = require('../middlewares/requireLogin');
const refreshSpotify = require('../middlewares/refreshToken');
const SpotifyController = require('../controllers/SpotifyController');

const SeatGeekController = require('../controllers/SeatGeekController');

module.exports = (app) => {

    app.get('/api/tracks', requireLogin,refreshSpotify, async (req,res) => {
        const user =  req.user;

        try {
            const result = await axios({
                method : 'get',
                url : 'https://api.spotify.com/v1/me/tracks',
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            if(result.data){
                console.log(result.data);
                res.send(result.data);
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }

    });

    app.get('/api/new/:page', requireLogin,refreshSpotify, async (req,res) => {
        const user =  req.user;
        const page = req.params.page ? req.params.page :  0;
        const offset = 20 * page;

        try {
            const result = await axios({
                method : 'get',
                url : 'https://api.spotify.com/v1/browse/new-releases?offset=' + offset,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            if(result.data){
                res.send(result.data);
            }else{
                res.send("ERROR");
            }

        }catch(e){
            console.log('eeeeee' + e);
        }

    });

    app.get('/api/top/:page', requireLogin,refreshSpotify, async (req,res) => {
        const user =  req.user;
        const page = req.params.page ? req.params.page :  0;
        const offset = 20 * page;

        try {
            const result = await axios({
                method : 'get',
                url : 'https://api.spotify.com/v1/me/top/artists?offset=' + offset,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            if(result.data){
                res.send(result.data);
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }

    });

    app.get('/api/following/:page',  requireLogin,refreshSpotify,async (req,res) => {
        const user =  req.user;
        const page = req.params.page ? req.params.page :  0;
        const offset = 20 * page;

        try {
            const result = await axios({
                method : 'get',
                url : 'https://api.spotify.com/v1/me/following?offset=' + offset,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            if(result.data){
                res.send(result.data);
            }else{
                res.send("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }

    });

    app.get('/api/releases/', requireLogin,refreshSpotify,  async (req,res) => {
        const lat = req.query.latitude;
        const lng = req.query.longitude;

        const con = new SpotifyController(req.user);
        const newReleases = await con.findNewMusic(lat,lng,req);

        res.send(newReleases);
    });

    app.get('/api/shows',  async (req,res) => {
       const con = new SeatGeekController();
       const events = await con.getArtistPerformance("travis scott","test");
       res.send(events);
        // const newReleases = await con.findNewMusic();
        //
        // res.send(newReleases);
    });
    app.get('/api/devices',  requireLogin, refreshSpotify,async (req,res) => {
        const con = new SpotifyController(req.user);
        const devices = await con.getConnectedDevices();
        res.send(devices);
        // const newReleases = await con.findNewMusic();
        //
        // res.send(newReleases);
    });

    app.post('/api/play', requireLogin,refreshSpotify, async (req,res) => {
        const track =  req.body.track;
        const device = req.body.device;

        const con = new SpotifyController(req.user);
        const devices = await con.playTrack(track,device);
        res.send(devices);
    });
    app.post('/api/resume',  requireLogin,refreshSpotify,async (req,res) => {
        const con = new SpotifyController(req.user);
        const devices = await con.resumeTrack();
        res.send(devices);
    });

    app.post('/api/pause', requireLogin,refreshSpotify, async (req,res) => {
        const device = req.body.device;

        const con = new SpotifyController(req.user);
        const devices = await con.pauseTrack(device);
        res.send(devices);
    });
    app.post('/api/previous', requireLogin,refreshSpotify, async (req,res) => {
       const device = req.body.device;

        const con = new SpotifyController(req.user);
        const response = await con.previous(device);
        res.send(response);
    });
    app.post('/api/next', requireLogin, refreshSpotify,async (req,res) => {
        const device = req.body.device;

        const con = new SpotifyController(req.user);
        const response = await con.next(device);
        res.send(response);
    });

};