module.exports = {
    spotify_client_id : process.env.SPOTIFY_CLIENT_ID,
    spotify_client_secret : process.env.SPOTIFY_CLIENT_SECRET,
    mongoDB :  process.env.MONGO_DB,
    cookieKey :  process.env.COOKIE_KEY,
    seatgeek_client_id : process.env.SEATGEEK_CLIENT_ID,
    spotify_scopes : ['user-read-email', 'user-read-private', 'user-library-read','user-top-read',
        'user-read-recently-played','app-remote-control','streaming', 'user-follow-modify',
        'user-follow-read', 'app-remote-control', 'streaming','user-read-playback-state',
        'user-modify-playback-state']
};