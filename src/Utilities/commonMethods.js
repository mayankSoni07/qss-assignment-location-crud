import { toast } from 'react-toastify';
import { DATABASE_NAME, OBJECT_STORE_NAME, DB_KEYS, UNIQUE_DB_KEY } from './commonConstants';

let db;

export function showToast(param){
    const { type, message } = param;
    if(type === "success"){
        toast.success(message);
    } else {
        toast.error(message);
    }
}

/** Used to get store from db */
function getStoreFromDb(){
    var transaction = db.transaction([OBJECT_STORE_NAME], "readwrite");
    var store = transaction.objectStore(OBJECT_STORE_NAME);
    return store;
}

/** Used to initialize db */
export function initializeDb(callback){
    let dbReq = indexedDB.open(DATABASE_NAME, 1);

    dbReq.onupgradeneeded = function(event) {    
        // Set the db variable to our database so we can use it!  
        db = event.target.result;

        // Create an object store named {OBJECT_STORE_NAME}. Object stores in databases are where data are stored.
        let locations = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: UNIQUE_DB_KEY, autoIncrement: true});
        // Create db index
        DB_KEYS.map((key)=>{
            locations.createIndex(key, key, { unique: key === UNIQUE_DB_KEY });
        })
    }
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        console.log('success opening database : ', event);
        callback(true);
    }
    dbReq.onerror = function(event) {
        console.log('error opening database : ', event.target.errorCode);
        callback(false);
    }
}

/** Used to add data in db */
export function addDataInDb(requestData, callback){
    var store = getStoreFromDb();
    // Perform the add
    var request = store.add(requestData);
    request.onsuccess = function(e) {
        console.log("Add data success : ", e);
        callback({
            isError: false,
            message: "Successfully added data"
        });
    }
    request.onerror = function(e) {
        console.log("Add Data Error : ",e);
        callback({
            isError: true,
            message: e.target.error.message
        });
    }
}

/** Used to update data in db */
export function updateDataInDb(){
    var store = getStoreFromDb();

    var person = {
        name:"hello",
        email:"email-9",
        created:new Date()
    }

    // Perform the update
    var request = store.put(person);
    request.onerror = function(e) {
        console.log("Update Data Error : ",e);
    }
    request.onsuccess = function(e) {
        console.log("Update data success : ", e);
    }
}

/** Used to delete data from db */
export function deleteDataFromDb(name, callback){
    var store = getStoreFromDb();

    var request = store.delete(name);
    request.onerror = function(e) {
        console.log("Delete Data Error : ",e);
        callback({
            isError: true,
            message: e.target.error.message
        });
    }
    request.onsuccess = function(e) {
        console.log("Delete data success : ", e);
        callback({
            isError: false,
            message: "Data deleted successfully"
        });
    }
}

/** Used to search data in db */
export function searchDataInDb(){
    var store = getStoreFromDb();
    let searchRequest = store.get("email2");
    searchRequest.onerror = function(e) {
        console.log("Serach Error",e);
    }
    searchRequest.onsuccess = function(e) {
        console.log("Search result ", e);
    }
}

/** Used to fetch all data in db */
export function getAllDataFromDb(callback){
    var store = getStoreFromDb();
    let getAllDataRequest = store.getAll();
    getAllDataRequest.onsuccess = function(e){
        callback(e.target.result);
    }
    getAllDataRequest.onerror = function(e){
        callback([]);
    }
}