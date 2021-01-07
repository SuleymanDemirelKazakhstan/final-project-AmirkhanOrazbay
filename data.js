const { create } = require('express-handlebars');
const { use } = require('./login');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID
const urlToDataBase = "mongodb+srv://realsleep:qwerty159@cluster0.y6deu.mongodb.net/tbt?retryWrites=true&w=majority";
// addUser({ email: 'amir', name: 'amir', password: 'amie' });
async function getCollection(dataBaseName, collectionName) {
    // connect to your cluster
    const client = await MongoClient.connect(urlToDataBase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db(dataBaseName);
    // execute find query
    const items = await db.collection(collectionName);
    // close connection
    // client.close();
    return items;
}
async function isUser(userInfo) {
    userInfo.password = await hashIt(userInfo.email, userInfo.password);
    delete userInfo.name;
    let collection = await getCollection('tbt', 'users');
    let user = collection.findOne(userInfo);
    return user;
}

// getBoard('ba', '5fd5e8af1374940824ec7b99');
async function getBoard(username, id) {
    let objID = new ObjectId(id);
    let collection = await getCollection('tbt', 'board');
    let result = await collection.findOne({ _id: objID });
    let tables = result.table;
    let board = {
        id: result._id,
        name: result.name,
        private: result.private,
        favorite: result.favorite,
        table: []
    };
    for (let i = 0; i < tables.length; i++) {
        let table = await getTable(username, tables[i]);
        board.table.push(table);
    }
    return board;
}

async function getTable(username, id) {
    let objID = new ObjectId(id);
    let collection = await getCollection('tbt', 'table');
    let result = await collection.findOne({ _id: objID });
    return result;
}

async function addUser(user) {
    let collection = await getCollection('tbt', 'users');
    user.password = await hashIt(user.email, user.password);
    let result = await collection.insertOne(user);
    let document = result.ops[0];
    return document;
}

async function createBoard(username, body) {
    let tableNames = body.tableNames;
    let newBoard = {
        username: username,
        name: body.name,
        private: body.private,
        favorite: body.favorite,
        table: []
    };
    if (typeof tableNames === 'string') {
        let id = await createTable(username, tableNames);
        newBoard.table.push(new ObjectId(id));
    } else {
        for (let i = 0; i < tableNames.length; i++) {
            let id = await createTable(username, tableNames[i]);
            newBoard.table.push(new ObjectId(id));
        }
    }
    let collection = await getCollection('tbt', 'board');
    let result = await collection.insertOne(newBoard);
    let document = result.ops[0];
    return document._id;
}

async function createTable(username, name) {
    if (!name) return;
    let newTable = {
        username: username,
        name: name,
        task: []
    };
    let collection = await getCollection('tbt', 'table');
    let result = await collection.insertOne(newTable);
    let document = result.ops[0];
    return document._id;
}

async function updateBoardName(id, name) {
    let objID = new ObjectId(id);
    let collection = await getCollection('tbt', 'board');
    var board = { _id: objID };
    var newvalues = { $set: { name: name } };
    let response = await collection.updateOne(board, newvalues);
    return response;
}

async function updateStatus(type, id, status) {
    let objID = new ObjectId(id);
    let collection = await getCollection('tbt', 'board');
    var board = { _id: objID };
    var object = {};
    if (type == 'private') object.private = status;
    if (type == 'favorite') object.favorite = status;
    var newvalues = { $set: object };
    let response = await collection.updateOne(board, newvalues);
    return response;
}

async function hashIt(login, password) {
    if (!password) return undefined;
    let newPwd = '';
    for (let index = 0; index < password.length; index++) {
        const char = password.charCodeAt(index) + login.charCodeAt(index % login.length);
        const pwd = String.fromCharCode(char % 26 + 97);
        newPwd += pwd;
    }
    return newPwd;
}

module.exports.getCollection = getCollection;
module.exports.hashIt = hashIt;
module.exports.isUser = isUser;
module.exports.getTable = getTable;
module.exports.getBoard = getBoard;
module.exports.addUser = addUser;
module.exports.createBoard = createBoard;
module.exports.createTable = createTable;
module.exports.updateBoardName = updateBoardName;
module.exports.updateStatus = updateStatus;