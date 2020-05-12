import { toast } from 'react-toastify';
import { DATABASE_NAME, OBJECT_STORE_NAME, DB_KEYS, UNIQUE_DB_KEY } from './commonConstants';

let db;

/** Used to show Toaster */
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
        callback(true);
    }
    dbReq.onerror = function(event) {
        callback(false);
    }
}

/** Used to add data in db */
export function addDataInDb(requestData, callback){
    var store = getStoreFromDb();
    // Perform the add
    var request = store.add(requestData);
    request.onsuccess = function(e) {
        callback({
            isError: false,
            message: "Added data successfully"
        });
    }
    request.onerror = function(e) {
        callback({
            isError: true,
            message: e.target.error.message
        });
    }
}

/** Used to update data in db */
export function updateDataInDb(requestData, callback){
    var store = getStoreFromDb();
    // Perform the update
    var request = store.put(requestData);
    request.onerror = function(e) {
        callback({
            isError: true,
            message: e.target.error.message
        });
    }
    request.onsuccess = function(e) {
        callback({
            isError: false,
            message: "Updated data successfully"
        });
    }
}

/** Used to delete data from db */
export function deleteDataFromDb(name, callback){
    var store = getStoreFromDb();

    var request = store.delete(name);
    request.onerror = function(e) {
        callback({
            isError: true,
            message: e.target.error.message
        });
    }
    request.onsuccess = function(e) {
        callback({
            isError: false,
            message: "Data deleted successfully"
        });
    }
}

/** Used to search data in db */
export function searchDataInDb(name, callback){
    var store = getStoreFromDb();
    let searchRequest = store.get(name);
    searchRequest.onsuccess = function(e) {
        if(e.target.result){
            callback({
                isError: false,
                message: "Fetch data successfully",
                data: e.target.result
            });
        } else {
            callback({
                isError: true,
                message: "Data doesn't exist in Database."
            });
        }
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

/** Used to format number in US format */
export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }