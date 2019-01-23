import { createSelector } from 'reselect';
import { getFollows, getMostPlayedArtist} from "./CommonSelectors";


export const getFollowsLastID = createSelector(
    getFollows,
    follows =>  follows.length ?  follows[follows.length -1].id : 0,
);

export const getMostPlayedOffset = createSelector(
    getMostPlayedArtist,
    mostPlayed =>  mostPlayed.length,
);