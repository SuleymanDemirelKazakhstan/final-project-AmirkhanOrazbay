//varibles
const boardID = document.querySelector('.tables').id;
const URL = 'http://localhost:8080/tables';
//elements

//board name element
const boardNameInput = document.querySelector('.name input');
const favoriteImg = document.querySelector('.favorite img');
const privateDiv = document.querySelector('.private');
//event listeners

//event listener on input for board name
boardNameInput.addEventListener('input', updateBoardName);
favoriteImg.addEventListener('click', updateFavoriteStatus);
privateDiv.addEventListener('click', updatePrivateStatus);
// functions

//update board name funciton
async function updateBoardName(event) {
    let url = URL + '/newName/' + boardID + '/' + event.target.value;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

async function updateFavoriteStatus(event) {
    let status = event.target.dataset.status;
    if (status == 'on') event.target.dataset.status = null;
    else event.target.dataset.status = 'on';
    event.target.src = '/file/img/star' + event.target.dataset.status + '.svg';

    let url = URL + '/status/favorite/' + boardID + '/' + event.target.dataset.status;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

async function updatePrivateStatus(event) {
    let status = event.target.dataset.status;
    if (status == 'on') event.target.dataset.status = null;
    else event.target.dataset.status = 'on';

    let url = URL + '/status/private/' + boardID + '/' + event.target.dataset.status;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}