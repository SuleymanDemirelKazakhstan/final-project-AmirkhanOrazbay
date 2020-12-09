let tableArray = [];

var Table = (function() {

    var Table = function(settings) {
        this.title = settings.title;
        this.tasks = settings.tasks;
    };

    return Table;
})();
let tables = document.querySelectorAll('.table');

let addTableBtn = document.querySelector('.btnAddTable');
addTableBtn.addEventListener('click', () => document.querySelector('.submitTable').style.display = 'block');

let addTaskBtns = document.querySelectorAll('.btnAddTask');
for (let i = 0; i < addTaskBtns.length; i++) {
    addTaskBtns[i].addEventListener('click', (event) => event.target.parentNode.childNodes[5].style.display = 'block');
}

let private = document.querySelector('.private');
private.addEventListener('click', (event) => {
    event.target.dataset.status = event.target.dataset.status ? "" : "on";
});

let favorite = document.querySelector('.favorite');
favorite.addEventListener('click', (event) => {
    let src = '/file/img/star';
    if (event.target.src.length === 39) {
        src += 'on';
    }
    event.target.src = src + '.svg';
});

let task = document.querySelectorAll('.task');
task.forEach(element => element.addEventListener('click', taskManager));

let saveBtn = document.querySelectorAll('.saveBtn');
for (var i = 0; i < saveBtn.length - 2; i++) {
    saveBtn[i].addEventListener('click', addTask);
}
saveBtn[saveBtn.length - 2].addEventListener('click', createTable);
saveBtn[saveBtn.length - 1].addEventListener('click', saveTask);


let last;
let closeTask = (event) => {
    event.target.parentNode.parentNode.parentNode.style.display = 'none';
    event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].value = '';
}
let closeSubmit = () => {
    document.querySelector('.submitTable').style.display = 'none';
    document.querySelector('#name').childNodes[0].value = '';
}
let closeTaskManager = () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.text').childNodes[0].value = '';
}
let cancelBtn = document.querySelectorAll('.cancelBtn');
for (var i = 0; i < cancelBtn.length - 2; i++) {
    cancelBtn[i].addEventListener('click', closeTask);
}
cancelBtn[cancelBtn.length - 2].addEventListener('click', closeSubmit);
cancelBtn[cancelBtn.length - 1].addEventListener('click', closeTaskManager);

function addTask(event) {
    var tasks = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[3];
    var taskDiv = document.createElement('div');
    var taskInput = document.createElement('input');
    taskInput.value = event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].value;
    taskDiv.className = 'task';
    taskDiv.appendChild(taskInput);
    tasks.appendChild(taskDiv);
    task = document.querySelectorAll('.task');
    task.forEach(element => element.addEventListener('click', taskManager));
    event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].value = '';
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
    tableName.value = document.querySelector('#name').childNodes[0].value;
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
    document.querySelector('.tables').insertBefore(wrap, document.querySelector('.submitTable').parentNode);
    load();
    closeSubmit();
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