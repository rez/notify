import * as constants from '../../../constants/constants';
import * as timeConstants from '../../../constants/TimeConstants';
import {TIME_6_MONTHS_VALUE} from "../../../constants/TimeConstants";
export const defaultState = {
    follows:[],
    mostPlayed:[],
    timeSpan: timeConstants.TIME_6_MONTHS_VALUE,
    activeGrid:constants.FOLLOWING,
    fetching:true
};