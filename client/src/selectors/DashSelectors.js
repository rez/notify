import { createSelector } from 'reselect';
import {getFollows, getMostPlayedArtist, getSelectedTimeSpan} from "./CommonSelectors";

const convertSpotifyDate = date =>  new Date(date).getTime();
const filterArtistByTime = (artist,time) => {
    return artist.map(artist =>{
        let filteredReleases = artist.releases.filter(release => convertSpotifyDate(release.release_date) > time);
        return {...artist, releases : filteredReleases};
    }).filter(artist => artist.releases.length > 0);
};

export const getFollowsLastID = createSelector(
    getFollows,
    follows =>  follows.length ?  follows[follows.length -1].id : 0,
);

export const getMostPlayedOffset = createSelector(
    getMostPlayedArtist,
    mostPlayed =>  mostPlayed.length,
);

export const getMostPlayedByTime = createSelector(
    getMostPlayedArtist,
    getSelectedTimeSpan,
    filterArtistByTime
);
export const getFollowsByTime = createSelector(
    getFollows,
    getSelectedTimeSpan,
    filterArtistByTime
);


