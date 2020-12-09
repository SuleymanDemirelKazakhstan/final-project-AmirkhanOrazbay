let count = 1;

let btnAddTableName = document.querySelector('.btnAddTable');
btnAddTableName.addEventListener('click', createTableName);

let btnCreate = document.querySelector('.btnCreate');
// btnCreate.addEventListener('click', validBtnCreate);

let input = document.querySelector('.nameInput input');
input.addEventListener('input', validBtnCreate);
input.addEventListener('keypress', validBtnCreate);

let private = document.querySelector('#private .checkbox');
private.addEventListener('click', changeIt);
let favourite = document.querySelector('#favorite .checkbox');
favourite.addEventListener('click', changeIt);

function changeIt(event) {
    var status = event.srcElement.dataset.status;
    if (status == 'false') event.srcElement.dataset.status = 'true';
    else event.srcElement.dataset.status = 'false';
}


function createTableName() {
    var tableNames = document.querySelector('.tableNames');

    var tableName = document.createElement('div');
    tableName.className = 'tableName';

    var counterH3 = document.createElement('label');
    counterH3.innerHTML = count + ')';
    count += 1;
    var nameH3 = document.createElement('input');
    nameH3.placeholder = 'Write table name';
    nameH3.name = 'tableNames';

    tableName.appendChild(counterH3);
    tableName.appendChild(nameH3);

    tableNames.appendChild(tableName);
}

// function createTable() {
// 	// body...
// }

function validBtnCreate(event) {
    if (input.value.length == 0) btnCreate.dataset.color = 'gray';
    else btnCreate.dataset.color = 'green';
}

createTableName();