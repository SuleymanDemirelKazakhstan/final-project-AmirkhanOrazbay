let tableArray = [];

var Table = (function() {

    var Table = function(settings) {
        this.title = settings.title;
        this.tasks = settings.tasks;
        this.id = settings.id;
    };

    Table.prototype.getDescription = function(id) {
        return this.tasks[id].getDescription();
    }

    Table.prototype.setDescription = function(id, text) {
        this.tasks[id].setDescription(text);
    }

    Table.prototype.renderTasks = function() {
        let id = 0;
        this.tasks.forEach(element => {
            element.id = id;
            let task = new Task(element);
            this.tasks.push(task);
            createTask(task, this.id, element.id);
            id += 1;
        });
    }

    return Table;
})();

var Task = (function() {
    var Task = function(settings) {
        this.title = settings.title;
        this.description = settings.description;
    };

    Task.prototype.getDescription = function() {
        return this.description;
    }

    Task.prototype.setDescription = function(text) {
        console.log(text);
        this.description = text;
        console.log(this.description);
    }

    return Task;
})();
let tables = document.querySelectorAll('.table');
let addTaskBtns;
let saveBtn;
let cancelBtn;

let closeTask = (event) => {
    console.log(event.target);
    event.target.parentNode.parentNode.parentNode.style.display = 'none';
    event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].value = '';
}
let closeSubmit = () => {
    document.querySelector('.submitTable').style.display = 'none';
    document.querySelector('#newTableName').childNodes[0].value = '';
}
let closeTaskManager = () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.text').childNodes[0].value = '';
}

let addTableBtn = document.querySelector('.btnAddTable');
addTableBtn.addEventListener('click', () => {
    document.querySelector('.submitTable').style.display = 'block';
    document.querySelector('.submitTable .tableName').focus();
});

let private = document.querySelector('.private');
private.addEventListener('click', (event) => event.target.dataset.status = event.target.dataset.status ? "" : "on");

let favorite = document.querySelector('.favorite');
favorite.addEventListener('click', (event) => {
    let src = '/file/img/star';
    if (event.target.dataset.status) {
        event.target.dataset.status = '';
    } else {
        src += 'on';
        event.target.dataset.status = 'on';
    }
    event.target.src = src + '.svg';
});

let task = document.querySelectorAll('.task');
task.forEach(element => element.addEventListener('click', taskManager));


function addTask(event) {
    let idTable = event.target.id.substring(4);
    let input = document.querySelector('#table' + idTable + ' .submitTask .tableName');
    let title = input.value;
    if (!title) {
        closeTask(event);
        return;
    }
    let task = new Task({ title: title, description: '' });
    createTask(task, idTable, tableArray[parseInt(idTable)].tasks.length);
    input.value = '';
    tableArray[parseInt(idTable)].tasks.push(task);
    localStorage.setItem('tables', JSON.stringify(tableArray));
    init();
}

function createTask(task, idTable, idTask) {
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = idTable + '_' + idTask;

    let taskInput = document.createElement('input');
    taskInput.value = task.title;

    taskDiv.appendChild(taskInput);

    let tasksDiv = document.querySelector('#table' + idTable + ' .tasks');
    tasksDiv.appendChild(taskDiv);
}

function addTable(event) {
    let input = document.querySelector('#newTableName input');
    let tableName = input.value;
    if (!tableName) {
        closeSubmit();
        return;
    }
    let newTable = new Table({ title: tableName, tasks: [], id: tableArray.length });
    createTable(newTable, tableArray.length);
    input.value = '';
    tableArray.push(newTable);
    localStorage.setItem('tables', JSON.stringify(tableArray));
    init();
    console.log(addTableBtn.childNodes);
    addTableBtn.childNodes[0].focus();
}

function createTable(table, id) {
    var wrap = document.createElement('div');
    wrap.className = 'wrapper';

    var tableDiv = document.createElement('div');
    tableDiv.className = 'table';
    tableDiv.id = 'table' + id;

    var tableName = document.createElement('input');
    tableName.type = 'text';
    tableName.value = table.title;
    tableName.className = 'tableName';
    tableDiv.appendChild(tableName);

    var tasksDiv = document.createElement('div');
    tasksDiv.className = 'tasks';
    tableDiv.appendChild(tasksDiv);

    var submitDiv = document.createElement('div');
    submitDiv.className = 'submitTask';

    var nameDiv = document.createElement('div');
    nameDiv.id = 'name';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'tableName';
    nameDiv.appendChild(input);

    submitDiv.appendChild(nameDiv);

    var btns = document.createElement('div');
    btns.className = 'btns';

    var saveDiv = document.createElement('div');
    saveDiv.classList = 'saveBtn';

    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.innerHTML = 'Save';
    saveBtn.id = 'save' + id;
    saveDiv.appendChild(saveBtn);

    var cancelDiv = document.createElement('div');
    cancelDiv.classList = 'cancelBtn';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.id = 'cancel' + id;
    cancelDiv.appendChild(cancelBtn);

    btns.appendChild(saveDiv);
    btns.appendChild(cancelDiv);

    submitDiv.appendChild(btns);
    tableDiv.appendChild(submitDiv);

    var addBtn = document.createElement('div');
    addBtn.className = 'btnAddTask';
    addBtn.innerHTML = '+ Add Task';
    tableDiv.appendChild(addBtn);

    wrap.appendChild(tableDiv);
    document.querySelector('.tables').insertBefore(wrap, document.querySelector('.submitTable').parentNode);
    closeSubmit();
}

function taskManager(event) {
    let element = event.target;
    let elementID = element.parentNode.id;
    let tableID = elementID.substring(0, elementID.indexOf('_'));
    let taskID = elementID.substring(elementID.indexOf('_') + 1);
    let title = element.value;
    let parent = document.querySelector('#table' + tableID + ' .tableName').value;
    let editWindow = document.querySelector('.taskManager');
    editWindow.id = elementID;
    let infoPart = editWindow.childNodes[1];
    infoPart.childNodes[1].innerHTML = title;
    infoPart.childNodes[3].innerHTML = 'in table ' + parent;
    let editor = document.querySelector('.text').childNodes[0];
    editor.value = tableArray[tableID].getDescription(taskID);
    document.querySelector('.overlay').style.display = 'block';
}

function saveTask() {
    let editor = document.querySelector('.text').childNodes[0];
    let text = editor.value;
    let editWindow = document.querySelector('.taskManager');
    let elementID = editWindow.id;
    let tableID = elementID.substring(0, elementID.indexOf('_'));
    let taskID = elementID.substring(elementID.indexOf('_') + 1);
    tableArray[tableID].setDescription(taskID, text);
    closeTaskManager();
    localStorage.setItem('tables', JSON.stringify(tableArray));
}

function load() {
    let tasksDiv = document.querySelector('.tables');
    for (var i = 0; i < tableArray.length; i++) {
        tasksDiv.removeChild(tasksDiv.firstChild);
    }
    tableArray = [];
    let arr = JSON.parse(localStorage.getItem('tables'));
    if (arr) {
        let id = 0;
        arr.forEach(element => {
            element.id = id;
            let table = new Table(element);
            tableArray.push(table);
            createTable(table, id);
            table.renderTasks();
            id += 1;
        });
    }
    console.log(tableArray);
}

function init() {
    task = document.querySelectorAll('.task');
    task.forEach(element => element.addEventListener('click', taskManager));
    saveBtn = document.querySelectorAll('.saveBtn');
    for (var i = 0; i < saveBtn.length - 2; i++) {
        saveBtn[i].addEventListener('click', addTask);
    }
    saveBtn[saveBtn.length - 2].addEventListener('click', addTable);
    saveBtn[saveBtn.length - 1].addEventListener('click', saveTask);

    cancelBtn = document.querySelectorAll('.cancelBtn');
    for (var i = 0; i < cancelBtn.length - 2; i++) {
        cancelBtn[i].addEventListener('click', closeTask);
    }
    cancelBtn[cancelBtn.length - 2].addEventListener('click', closeSubmit);
    cancelBtn[cancelBtn.length - 1].addEventListener('click', closeTaskManager);

    addTaskBtns = document.querySelectorAll('.btnAddTask');
    for (let i = 0; i < addTaskBtns.length; i++) {
        addTaskBtns[i].addEventListener('click', (event) => {
            let el = event.target.parentNode.childNodes[5];
            if (!el) el = event.target.parentNode.childNodes[2];
            // console.log(event.target.parentNode.childNodes)
            el.style.display = 'block'
        });
    }
}
load();
init();