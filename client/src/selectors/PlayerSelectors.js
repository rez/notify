import { createSelector } from 'reselect';
import { getDevices} from "./CommonSelectors";


export const getActiveDevice = createSelector(
    getDevices,
    devices =>  devices.find((device) => device.is_active).id,
);