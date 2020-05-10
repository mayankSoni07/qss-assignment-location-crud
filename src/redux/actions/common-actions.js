import * as constants from '../constants';
import { initializeDb, getAllDataFromDb } from '../../Utilities/commonMethods';

export function actionInitializeDb(){
    return (dispatch, getState) => {
        initializeDb((value)=>{
            if(value){
                dispatch(actionGetAllDataFromDb());
                dispatch(storeDataByKey({
                    key: "isDBInitialized",
                    value: value
                }))
            }
        })
    }
}

export function actionGetAllDataFromDb(){
    return (dispatch, getState) => {
        getAllDataFromDb((data)=>{
            dispatch(storeDataByKey({
                key: "allData",
                value: data
            }))
        })
    }
}

export function storeDataByKey(param) {
    return (dispatch, getState) => {
        const { key, value } = param;
        let obj = {};
        obj[key] = value;
        dispatch({
            type: constants.STORE_DATA_BY_KEY,
            payload : obj
        })
    }
}
