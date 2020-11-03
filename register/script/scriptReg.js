let email = document.querySelector('#email');
email.addEventListener('input', validBtnCreate);
email.addEventListener('keypress', validBtnCreate);

let name = document.querySelector('#name');
name.addEventListener('input', validBtnCreate);
name.addEventListener('keypress', validBtnCreate);

let password = document.querySelector('#password');
password.addEventListener('input', validBtnCreate);
password.addEventListener('keypress', validBtnCreate);

let btnSignUp = document.querySelector('.signUpBtn');

function validBtnCreate() {
	var emailValLen= email.value.length;
	var nameValLen = name.value.length;
	var passwordValLen = password.value.length;
	if (emailValLen == 0 || nameValLen == 0 || passwordValLen == 0) 
		btnSignUp.dataset.color = 'gray';
  	else 
  		btnSignUp.dataset.color = 'blue';
}
