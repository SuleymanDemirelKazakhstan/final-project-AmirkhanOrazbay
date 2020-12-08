let tasksArray = [];

var Task = (function () {

    var Task = function (settings) {
        this.title = settings.title;
        this.status = settings.status;
    };

    Task.prototype.changeStatus = function () {
        this.status = !this.status;
    };

    Task.prototype.equals = function (task) {
        return this.title === task.title;
    };

    return Task;
})();

let btnAdd = document.querySelector('#btnNewTask');
btnAdd.addEventListener('click', addTask);

let deleteBtn = document.querySelectorAll('.delete');
let checkbox = document.querySelectorAll('.checkbox');

load();
function addTask(event) {
    let input = document.querySelector('#newTask');
    let title = input.value
    if (!title) return;
    let task = new Task({ title: title, status: false });
    createTask(task);
    input.value = '';
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    load()
}

function deleteTask(event) {
    let taskDiv = event.path[1];
    let leftPart = taskDiv.childNodes[0];
    let status = leftPart.childNodes[0];
    let description = leftPart.childNodes[1];
    let task = new Task({ title: description.innerHTML, status: status.checked });
    tasksArray = tasksArray.filter(element => !element.equals(task));
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    taskDiv.remove();
}

function createTask(task) {
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.dataset.status = task.status;

    let leftPart = document.createElement('div');
    leftPart.className = 'leftPart';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.status ? 'checked' : '';
    checkbox.className = 'checkbox';
    leftPart.append(checkbox);

    let description = document.createElement('div');
    description.className = 'description';
    description.innerHTML = task.title;
    leftPart.append(description);

    taskDiv.append(leftPart);

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = '+';
    taskDiv.append(deleteBtn);

    let tasks = document.querySelector('.tasks');
    tasks.append(taskDiv);

    deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach(element => {
        element.addEventListener('click', deleteTask);
    });

    checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(element => {
        element.addEventListener('click', change);
    })
}

function load() {
    let tasksDiv = document.querySelector('.tasks');
    tasksDiv.innerHTML = '';
    let arr = JSON.parse(localStorage.getItem('tasks'));
    let doIt = arr.filter(element => !element.status);
    let done = arr.filter(element => element.status);
    arr = doIt.concat(done);
    tasksArray = [];
    arr.forEach(element => {
        let task = new Task(element);
        tasksArray.push(task);
        createTask(task);
    });
}

function change(event) {
    let leftPart = event.path[1];
    let status = leftPart.childNodes[0];
    let description = leftPart.childNodes[1];

    (event.path[2]).dataset.status = status.checked;

    let task = new Task({ title: description.innerHTML, status: status.checked });
    tasksArray.forEach(element => {
        if (element.equals(task)) element.changeStatus();
    });
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    load();
}