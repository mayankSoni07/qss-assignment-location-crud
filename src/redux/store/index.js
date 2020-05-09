import { createStore } from 'redux';
import integratedReducer from '../reducers';

const initialState = {}

const store = createStore(integratedReducer, initialState)
export default store;