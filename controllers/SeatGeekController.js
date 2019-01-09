const axios = require('axios');
const config = require('../config/config');
var ip = require('ip');
const iplocation = require("iplocation").default;
var ipLocation = require('ip-location')

class SeatGeekController {

    constructor() {
    }



    filterReleaseByDate(release){
        const d = new Date();
        d.setMonth(d.getMonth() - 10);
        const monthAgo = d.getTime() / 1000;
        const releaseDate = new Date(release.release_date).getTime() / 1000;
        return monthAgo < releaseDate;


    }
    async getArtistPerformance(artist = 'travis scott',zipcode){
        const artistSlug = artist.replace(" ", "-");
        // try{
        //     ipLocation('72.231.5.22')
        //         .then(function (data) {
        //             console.dir(data)
        //         })
        //         .catch(function (err) {
        //             console.error(err)
        //         })
        // }catch(e){
        //
        // }
        //
        // iplocation("72.231.5.22")
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //     });


        try {
            const result = await axios({
                method : 'get',
                url : `https://api.seatgeek.com/2/events?performers.slug=${artistSlug}&venue.state=NY&client_id=${config.seatgeek_client_id}`,
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