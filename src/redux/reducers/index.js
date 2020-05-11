import { combineReducers } from 'redux';
import { commonReducer } from './common-reducers';
import { reducer as formReducer } from 'redux-form';

/** Combine all the reducers and export one. */
const integratedReducer = combineReducers({
    commonReducer: commonReducer,
    form: formReducer
});
export default integratedReducer;