import * as constants from '../constants';
import { showToast, initializeDb, getAllDataFromDb, addDataInDb, deleteDataFromDb } from '../../Utilities/commonMethods';

/** Intialize Database Action */
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

/** Get All Data Action */
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

/** Add Data Action */
export function actionAddData(requestData, history){
    return (dispatch, getState) => {
        console.log('requestData  aciton s :  ', requestData)
        addDataInDb(requestData, (param)=>{
            ToastHandeler(param, history);
        });
    }
}

/** Delete Data Action */
export function actionDeleteData(name){
    return (dispatch, getState) => {
        deleteDataFromDb(name, (param)=>{
            ToastHandeler(param);
            if(!param.isError){
                dispatch(actionGetAllDataFromDb())
            }
        })
    }
}

/** Used to save data by key in Store */
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

/** Used to show Toaster */
function ToastHandeler(param, history){
    const { isError, message } = param;
    if(isError){
        showToast({ type: "error", message: message });
    } else {
        if(history)
            history.push('/');
        showToast({ type: "success", message: message });
    }
}