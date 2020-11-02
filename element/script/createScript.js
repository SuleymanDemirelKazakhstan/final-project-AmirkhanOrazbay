let btnAddTableName = document.querySelector('.btnAddTable');
btnAddTableName.addEventListener('click', createTableName);

let btnCreate = document.querySelector('.btnCreate');
// btnCreate.addEventListener('click', validBtnCreate);

let input = document.querySelector('.nameInput input');
input.addEventListener('input', validBtnCreate);
input.addEventListener('keypress', validBtnCreate);

let private = document.querySelector('#private .checkbox');
private.addEventListener('click', changeIt);
let favourite = document.querySelector('#favourite .checkbox');
favourite.addEventListener('click', changeIt);

function changeIt(event) {
	var status = event.srcElement.dataset.status;
	if (status == 'false') event.srcElement.dataset.status = 'true';
	else event.srcElement.dataset.status = 'false';
}

function createTableName() {
	var tableNames = document.querySelector('.tableNames');
	var childNodes = tableNames.childNodes;
	var len = childNodes.length;

	if (len%2==0) len = len - 1;
	else len = len-2;

	var lastChildNodes = childNodes[len].childNodes;
	
	len = lastChildNodes.length;
	if (len > 2) len = 1;
	else len = 0;

	var count = lastChildNodes[len].innerHTML.charAt(0);
	var tableName = document.createElement('div');
	tableName.className = 'tableName';

	var counterH3 = document.createElement('h3');
	counterH3.innerHTML = (parseInt(count)+1) + ') ';
	var nameH3 = document.createElement('h3');
	nameH3.contentEditable = 'true';
	nameH3.innerHTML = 'Write table name';

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

