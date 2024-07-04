const db = require('./db.js').db;
const collectionName = 'client'

class Client {
    constructor(userID, passwd) {
        this.userID = userID;
        this.passwd = passwd;
    }
}

/** return all clients */
async function all() {
    clients = await find({});
    return clients;
}

/** find a set of clients satisfying p */
async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var depts = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            const client = new Client(dbobj.code);
            clients.push(client);
        }
        return clients;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

/** insert a list of clients */
async function insertMany( clients ) {
    try {
        const collection = db.collection(collectionName);
        //insertMany comes from mongodb insert library
        await collection.insertMany(clients);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}


module.exports = { Client, all, find, insertMany }