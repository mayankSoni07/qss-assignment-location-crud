import * as constants from '../constants';
import { 
    showToast, initializeDb, getAllDataFromDb, addDataInDb, updateDataInDb, deleteDataFromDb, searchDataInDb
} from '../../Utilities/commonMethods';

/** Intialize Database Action */
export function actionInitializeDb(callback){
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
        addDataInDb(requestData, (param)=>{
            ToastHandeler(param, history);
        });
    }
}

/** Edit Data Action */
export function actionEditData(requestData, history) {
    return (dispatch, getState) => {
        updateDataInDb(requestData, (param)=>{
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

/** Used to get data by give name */
export function actionGetDataByName(name){
    return (dispatch, getState) => {
        searchDataInDb(name, (param)=>{
            ToastHandeler(param);
            dispatch(storeDataByKey({
                key: "fetchDataEdit",
                value: param.data
            }))
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