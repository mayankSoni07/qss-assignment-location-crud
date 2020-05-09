import * as actionConstants from '../constants';

const initialState = { deviceType: 'sdfdfs' };

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        
        /** Used to set deviceType in store */
        // case actionConstants.DEVICE_TYPE:
        //     return {
        //         ...state,
        //         deviceType: action.payload.deviceType
        //     }

        default:
            return state
    }
}