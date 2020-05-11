import * as constants from '../constants';
import { showToast, initializeDb, getAllDataFromDb, addDataInDb } from '../../Utilities/commonMethods';

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

export function actionAddData(requestData, history){
    return (dispatch, getState) => {
        console.log('requestData  aciton s :  ', requestData)
        addDataInDb(requestData, (param)=>{
            const { isError, message } = param;
            if(isError){
                showToast({ type: "error", message: message });
            } else {
                history.push('/');
                showToast({ type: "success", message: message });
            }
        });
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
