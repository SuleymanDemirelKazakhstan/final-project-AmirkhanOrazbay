//varibles
const boardID = document.querySelector('.tables').id;
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
    let url = 'http://localhost:8080/tables/newName/' + boardID + '/' + event.target.value;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

async function updateFavoriteStatus(event) {
    let url = 'http://localhost:8080/tables/status/' + boardID + '/' + event.target.value;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

async function updatePrivateStatus(event) {
    let url = 'http://localhost:8080/tables/newName/' + boardID + '/' + event.target.value;

    let response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}