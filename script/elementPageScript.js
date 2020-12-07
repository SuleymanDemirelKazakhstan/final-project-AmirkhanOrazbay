let tables = document.querySelectorAll('.table');

let addTableBtn = document.querySelector('.btnAddTable');
addTableBtn.addEventListener('click', createTable);

let addTaskBtns = document.querySelectorAll('.btnAddTask');
for (let i = 0; i < addTaskBtns.length; i++) {
	addTaskBtns[i].addEventListener('click', addTask);
}

function addTask(event) {
	var tableChild = event.target.parentNode;
	var tasks = tableChild.childNodes[3];
	if (!tasks) tasks = tableChild.childNodes[1];
	console.log(tasks);
	var task = document.createElement('input');
	task.className = 'task';

	tasks.appendChild(task);
	task.focus();
}

function createTable() {
	var wrap = document.createElement('div');
	wrap.className = 'wrapper';

	var tableDiv = document.createElement('div');
	tableDiv.className = 'table';

	var tableName = document.createElement('input');
	tableName.type = 'text';
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

	wrap.appendChild(tableDiv);
	document.querySelector('.tables').insertBefore(wrap, addTableBtn.parentNode);
	tableName.focus();
	load();
}

function load() {
	addTaskBtns = document.querySelectorAll('.btnAddTask');
	for (let i = 0; i < addTaskBtns.length; i++) {
		addTaskBtns[i].addEventListener('click', addTask);
	}
}