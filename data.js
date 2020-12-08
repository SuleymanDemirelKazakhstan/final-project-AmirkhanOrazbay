const MongoClient = require('mongodb').MongoClient;
const urlToDataBase = "mongodb+srv://realsleep:1P0G3xBgoTqCHwzL@cluster0.y6deu.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

async function useCollection(dataBaseName, collectionName) {
    // connect to your cluster
    const client = await MongoClient.connect(urlToDataBase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db(dataBaseName);
    // execute find query
    const items = await db.collection(collectionName).find({ _id: "10006546" }).toArray();
    console.log(items);
    // close connection
    client.close();
    return items;
}
async function isItUser(username, password) {
    const users = useCollection('tbt', 'users');
    let bool = false;
    await users.then(el => {
        const user = el.find(element => element.login === username && element.password === password);
        bool = user;
    });
    return bool;
}

async function getTables(username) {
    const grades = useCollection('tbt','tables');
    let info = {};
    await grades.then(el => {
        const user = el.find(element => element.name === username);
        info = user;
    });
    return info;
}

async function getTable(username) {
    const time = useCollection('tbt', 'table');
    let info = {};
    await time.then(el => {
        const user = el.find(element => element.name === username);
        info = user;
    });
    return info;
}

function hashIt(login, password) {
    if (!password) return undefined;
    let newPwd = '';
    for (let index = 0; index < password.length; index++) {
        const char = password.charCodeAt(index) + login.charCodeAt(index % login.length);
        const pwd = String.fromCharCode(char % 26 + 97);
        newPwd += pwd;
    }
    return newPwd;
}

module.exports.useCollection = useCollection;
module.exports.hashIt = hashIt;
module.exports.isItUser = isItUser;
module.exports.getTable = getTable;
module.exports.getTables = getTables;