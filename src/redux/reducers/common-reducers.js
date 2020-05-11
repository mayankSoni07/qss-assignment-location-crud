import * as actionConstants from '../constants';

const initialState = { 
    allData: [], isDBInitialized: false
};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        
        /** Used to set deviceType in store */
        case actionConstants.STORE_DATA_BY_KEY:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}