let addTaskBtns = document.querySelectorAll('.btnAddTask');
let tables = document.querySelectorAll('.table');

let addTableBtn = document.querySelector('.btnAddTable');
addTableBtn.addEventListener('click', createTable);

for (let i = 0; i < addTaskBtns.length; i++) {
	addTaskBtns[i].addEventListener('click', function(event) {
		addTask(i, event);
	});
}

function addTask(i, event) {
	var tableChild = tables[i].childNodes;
	var tasks = tableChild[3];
	
	var task = document.createElement('div');
	task.className = 'task';
	task.innerHTML = 'task';

	tasks.appendChild(task);
}

function createTable() {
	var wrap = document.createElement('div');
	wrap.className = 'wrapper';

	var tableDiv = document.createElement('div');
	tableDiv.className = 'table';

	var tableName = document.createElement('div');
	tableName.innerHTML = 'Table name';
	tableName.className = 'tableName';
	tableDiv.appendChild(tableName);

	var tasksDiv = document.createElement('div');
	tasksDiv.className = 'tasks';
	tableDiv.appendChild(tasksDiv);

	var addBtn = document.createElement('div');
	addBtn.className = 'btnAddTask';
	addBtn.innerHTML = '+ Add Task';
	tableDiv.appendChild(addBtn);

	wrap.appendChild(tableDiv)
	document.querySelector('.tables').appendChild(wrap);
	addTaskBtns = document.querySelectorAll('.btnAddTask');
}