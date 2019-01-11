const axios = require('axios');
const SeatGeekController = require("./SeatGeekController");
const config = require("../config/config");


class SpotifyController {

    constructor(user) {
        this.user = user;
        this.seatGeekController = new SeatGeekController();
    }

     async getSpotifyFollows(page  = 0, results = []){
        const offset = 50 * page;
        try {
            const result = await axios({
                method : 'get',
                url : `https://api.spotify.com/v1/me/following?type=artist&offset=${offset}`,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            if(result.data){
                const max = 10;
                const newPage = page + 1;

                results = [...results, ...result.data.artists.items];
                if(max > (newPage * 50)) this.getSpotifyFollows(this.user,newPage,results);
                else return results;
            }else{
               console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }

    }

    filterReleaseByDate(release){
        const d = new Date();
        d.setMonth(d.getMonth() - 10);
        const monthAgo = d.getTime() / 1000;
        const releaseDate = new Date(release.release_date).getTime() / 1000;
        return monthAgo < releaseDate;


    }
   async getSpotifyReleases(id){
        try {
            const result = await axios({
                method : 'get',
                url : `https://api.spotify.com/v1/artists/${id}/albums`,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                const releases = result.data.items;
                const filteredReleases = releases.filter(this.filterReleaseByDate);


                return filteredReleases;
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }

     async findNewMusic(lat, lng, req){
        const following = await this.getSpotifyFollows();

        const newReleases = await axios.all(following.map( async follow => {
            const releases = {'releases' : await this.getSpotifyReleases(follow.id) ,
                              'sets' : await this.seatGeekController.getArtistPerformance(follow.name,lat, lng, req)};
            return {...follow, releases};
        }))

         newReleases.filter(artist => {return artist.releases.size});

        return newReleases;
    }

    async getConnectedDevices(){
        try {
            const result = await axios({
                method : 'get',
                url : `https://api.spotify.com/v1/me/player/devices`,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
    async resumeTrack(){
        try {
            const result = await axios({
                method : 'put',
                url : `https://api.spotify.com/v1/me/player/play`,
                dataType : 'json',
                data : {},
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
    async playTrack(track, device, position = 0){
        try {
            const result = await axios({
                method : 'put',
                url : `https://api.spotify.com/v1/me/player/play`,
                dataType : 'json',
                data : {device_id : device, context_uri : track, position_ms : position},
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
    async pauseTrack (device){
        try {
            const result = await axios({
                method : 'put',
                url : `https://api.spotify.com/v1/me/player/pause`,
                dataType : 'json',
                data : {device_id : device},
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
    async previous (device = null){
        try {
            const result = await axios({
                method : 'post',
                url : `https://api.spotify.com/v1/me/player/previous`,
                dataType : 'json',
                data : {device_id : device},
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }

    async next (device = null){
        try {
            const result = await axios({
                method : 'post',
                url : `https://api.spotify.com/v1/me/player/next`,
                dataType : 'json',
                data : {device_id : device},
                headers : {
                    'Authorization' : 'Bearer ' + this.user.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
    async refreshAccessToken (){
        try {

            const result = await axios({
                method : 'post',
                url : `https://accounts.spotify.com/api/token`,
                params : {
                    grant_type : "refresh_token",
                    refresh_token : this.user.spotifyRefreshToken
                },
                headers : {
                    'Authorization' : 'Basic ' +
                        Buffer.from(config.spotify_client_id +":"+config.spotify_client_secret).toString('base64'),
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            });


            if(result.data){
                return result.data
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }
}

module.exports = SpotifyController;