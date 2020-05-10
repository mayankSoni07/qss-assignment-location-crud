import { DATABASE_NAME, OBJECT_STORE_NAME, DB_KEYS, UNIQUE_DB_KEY } from './commonConstants';

let db;

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
        DB_KEYS.map((key)=>{
            locations.createIndex(key, key, { unique: key === UNIQUE_DB_KEY });
        })
    }
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        callback(true);
    }
    dbReq.onerror = function(event) {
        console.log('error opening database : ', event.target.errorCode);
        callback(false);
    }
}

/** Used to add data in db */
export function addDataInDb(){
    var store = getStoreFromDb();

    var person = {
        phone_number:"phn-"+parseInt(Math.random()*100),
        name:"name-"+parseInt(Math.random()*100)
    }
    
    // Perform the add
    var request = store.add(person);
    request.onerror = function(e) {
        console.log("Add Data Error : ",e);
    }
    request.onsuccess = function(e) {
        console.log("Add data success : ", e);
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
export function deleteDataFromDb(){
    var store = getStoreFromDb();

    var request = store.delete("email-95");
    request.onerror = function(e) {
        console.log("Delete Data Error : ",e);
    }
    request.onsuccess = function(e) {
        console.log("Delete data success : ", e);
    }
}

/** Used to search data in db */
export function searchDataInDb(){
    var store = getStoreFromDb();

    // Search person
    let searchRequest = store.get("email2");
    searchRequest.onerror = function(e) {
        console.log("Serach Error",e);
    }
    searchRequest.onsuccess = function(e) {
        console.log("Search result ", e);
    }
}

/** Used to fetch all data in db */
export function getAllDataFromDb(){
    let allData = [];
    var store = getStoreFromDb();
    var cursor = store.openCursor();
    cursor.onsuccess = function(e) {
        var res = e.target.result;
        if(res) {
            console.log("Key", res.value);
            allData.push(res.value);
            res.continue();
        }
    }
    return allData;
}