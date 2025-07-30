const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
String.prototype.isEmail = function() {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
}

function checkRequired(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      //Error
      errorInput(input, `${getName(input)} is Required`);
    } else {
      //Success
      successInput(input);
    }
  });
}

function getName(input) {
  return input.getAttribute("data-name");
}
function errorInput(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const p = formGroup.querySelector("p"); // -------
  p.innerHTML = message;
}

function successInput(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const p = formGroup.querySelector("p"); // -------
  p.innerHTML = "";
}

function checkLength(input, min, max) {
  const data = input.value.trim().length;
  if (data < min) {
    errorInput(input,`${getName(input)} must be at least greater than ${min} characters `);
  } else if (data > max) {
    errorInput(input,`${getName(input)} must be at most lesser than ${max} characters `);
  }
  else{
    successInput(input);
  }
}

function checkConfirmPassword(password, password2){
    if(password.value != password2.value){
        errorInput(password2,`${getName(password2)} does not match`);
    }
}

// function checkEmail(input){
//     if(!input.value.trim().isEmail()){
//          errorInput(input,`This is not a valid email address`);
//     }
// }
function checkEmail(input){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
        errorInput(input, `This is not a valid email address`);
    }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 10);
  checkLength(password, 5, 10);
  checkConfirmPassword(password, password2)
  checkEmail(email);
});
