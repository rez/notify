const axios = require('axios');
const config = require('../config/config');
var ip = require('ip');
const iplocation = require("iplocation").default;
var ipLocation = require('ip-location')

class SeatGeekController {

    constructor() {
    }

    async getArtistPerformance(artist = 'travis scott',lat = false, long = false, req){

        const artistSlug = artist.replace(" ", "-");
        const params = lat ? `&lon=${long}&lat=${lat}` : `&geoip=${req.ip}`;

        try {
            const result = await axios({
                method : 'get',
                url : `https://api.seatgeek.com/2/events?performers.slug=${artistSlug}${params}&client_id=${config.seatgeek_client_id}`,
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + config.seatgeek_client_id,
                    'Content-Type' : 'application/json'
                }
            });
            if(result){
                return result.data.events;
            }else{
                console.log("ERROR");
            }
        }catch(e){
            console.log('eeeeee' + e);
        }
    }

}

module.exports = SeatGeekController;