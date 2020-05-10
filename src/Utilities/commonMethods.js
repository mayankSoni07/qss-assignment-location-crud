let db;

/** Used to get store from db */
function getStoreFromDb(){
    var transaction = db.transaction(["locations"], "readwrite");
    var store = transaction.objectStore("locations");
    return store;
}

/** Used to initialize db */
export function initializeDb(){
    let dbReq = indexedDB.open('locationDatabase', 1);

    dbReq.onupgradeneeded = function(event) {    
        // Set the db variable to our database so we can use it!  
        db = event.target.result;

        // Create an object store named locations. Object stores in databases are where data are stored.
        let locations = db.createObjectStore('locations', { keyPath: "email", autoIncrement: true});
        console.log('onupgradeneeded locations : ', event, db, locations);
    }
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        console.log('onsuccess dbReq : ', event, db)
    }
    dbReq.onerror = function(event) {
        console.log('error opening database : ', event.target.errorCode);
    }
}

/** Used to add data in db */
export function addDataInDb(){
    var store = getStoreFromDb();

    var person = {
        name:"name",
        email:"email-"+parseInt(Math.random()*100),
        created:new Date()
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
    var store = getStoreFromDb();
    var cursor = store.openCursor();
    cursor.onsuccess = function(e) {
        var res = e.target.result;
        if(res) {
            console.log("Key", res.value);
            res.continue();
        }
    }
}