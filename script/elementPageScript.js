let tables = document.querySelectorAll('.table');

let addTableBtn = document.querySelector('.btnAddTable');
addTableBtn.addEventListener('click', createTable);

let addTaskBtns = document.querySelectorAll('.btnAddTask');
for (let i = 0; i < addTaskBtns.length; i++) {
    addTaskBtns[i].addEventListener('click', addTask);
}

let private = document.querySelector('.private');
private.addEventListener('click', (event) => {
    event.target.dataset.status = event.target.dataset.status ? "" : "on";
});

let task = document.querySelectorAll('.task');
task.forEach(element => element.addEventListener('click', taskManager));

let saveBtn = document.querySelector('.saveBtn');
saveBtn.addEventListener('click', saveTask);

let last;
let closeTaskManager = () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.text').childNodes[0].value = '';
}
let cancelBtn = document.querySelector('.cancelBtn');
cancelBtn.addEventListener('click', closeTaskManager);

let favorite = document.querySelector('.favorite');
favorite.addEventListener('click', (event) => {
    let src = '/file/img/star';
    if (event.target.src.length === 39) {
        src += 'on';
    }
    event.target.src = src + '.svg';
});


function addTask(event) {
    var tableChild = event.target.parentNode;
    var tasks = tableChild.childNodes[3];
    if (!tasks) tasks = tableChild.childNodes[1];
    var taskDiv = document.createElement('div');
    var taskInput = document.createElement('input');
    taskDiv.className = 'task';
    taskDiv.appendChild(taskInput);
    tasks.appendChild(taskDiv);
    taskInput.focus();
    task = document.querySelectorAll('.task');
    task.forEach(element => element.addEventListener('click', taskManager));
}

function saveTask() {
    let editor = document.querySelector('.text');
    let text = editor.childNodes[0].value;
    if (last) last.dataset.description = text;
    closeTaskManager();
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

function taskManager(event) {
    let element = event.target;
    last = element.parentNode;
    console.log(last);
    let title = element.value;
    let parent = element.parentNode.parentNode.parentNode.childNodes[0].value;
    let editWindow = document.querySelector('.taskManager');
    let infoPart = editWindow.childNodes[1];
    infoPart.childNodes[1].innerHTML = title;
    infoPart.childNodes[3].innerHTML = 'in table ' + parent;
    let text = document.querySelector('.text').childNodes[0];
    if (last.dataset.description) text.value = last.dataset.description;
    document.querySelector('.overlay').style.display = 'block';
}

function load() {
    addTaskBtns = document.querySelectorAll('.btnAddTask');
    for (let i = 0; i < addTaskBtns.length; i++) {
        addTaskBtns[i].addEventListener('click', addTask);
    }
}