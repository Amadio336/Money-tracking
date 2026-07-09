import { create_user } from "./api/api.js";


// registration 
const createUserButton = document.getElementById("create-user-button")
const usernameInput = document.getElementById("username-input")
const emailInput = document.getElementById("email-input")
const passwdInput = document.getElementById("passwd-input")
//login




function register() {

    const payload = {
        username: usernameInput.value,
        email: emailInput.value,
        plain_text_pwd: passwdInput.value
    }

    create_user(payload)    
}




createUserButton.addEventListener("click", register)