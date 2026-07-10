import { create_user, login } from "./api/api.js";

const appRoot = document.getElementById("app-root")

function router(track) {
    if (track == "0"){
        builder_0()
    }
    else if (track == "1a"){
       builder_1a()
    }
    else if (track == "2"){
        builder_2()
    }
    else if (track == "3a"){
        builder_3a()
    }
    else if (track == "3b"){
       builder_3b()
    }
    else if (track == "3c"){
       console.log("costruisco 3c")
    }
    else if (track == "4a"){
         console.log("creo 4a")
    }
    else if (track == "5a"){
         console.log("creo 5a")
    }
}




const retrieveTrack = (e) => {
    const track = e.currentTarget.dataset.track
    router(track)

}



const interface3Data = {}



function builder_0() {

    const template_0 = `
    <div id="main-container" class="container-xl  bd">
        <div class="row">
            <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center bd">
                <button id="login-button" class="p-5 m-4" data-track="1a">Accedi</button>
            </div>
            <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center bd">
             <button id="registration-button" class="p-5 m-4" data-track="1b">Registrati</button>
            </div>  
        </div>
    </div>
    `
     appRoot.innerHTML = template_0

     const loginButton = document.getElementById('login-button');

     loginButton.addEventListener("click", retrieveTrack )
}


function builder_1a() {

    const template_1a = `
    
    <div class="registration">
        <h2>Login</h2>
        <form id="login-form">
        <div>
            <label for="username-login-input">Username:</label>
            <input type="text" id="username-login-input" placeholder="Inserisci username">
        </div>

        <div>
        <label for="passwd-login-input">Password:</label>
        <input type="password" id="passwd-login-input" placeholder="Inserisci password">
        </div>

        <button type="button" id="login-submitt-button" data-track = "2">Crea Utente</button>
        </form>
        <button id="to-0" data-track="0"> Indietro </button>
    </div>
    `
    appRoot.innerHTML = template_1a
    
    const formLogin = document.getElementById('login-form');
    const usernameLoginInput = document.getElementById('username-login-input');
    const passwordLoginInput = document.getElementById('passwd-login-input');
    const submitLoginButton = document.getElementById('login-submitt-button');
    const backButtonTo0 = document.getElementById("to-0")

    function signIn(){
        const username = usernameLoginInput.value
        const plain_text_pwd = passwordLoginInput.value
        login(username, plain_text_pwd)
    }

    const routerTo2= ()=>{
        router("2")
    }

    submitLoginButton.addEventListener("click", signIn)
    document.addEventListener("loginSuccess", routerTo2 )


    backButtonTo0.addEventListener("click", retrieveTrack)

    
}

function builder_2() {

    const template_2 = `
        <div id="main-container" class="container-xl  bd">
        <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="insert" data-track="3a">Inserisci</button>
            </div>
            <div class="col-12 d-flex justify-content-center align-items-center bd">
             <button type="button" id="quick" data-track="4a" >Rapido</button>
            </div>  
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="panel" data-track = "5a">Pannello di controllo</button>
            </div>  
        </div>
    </div>
    `

    appRoot.innerHTML=template_2
    

    const insertButton = document.getElementById('insert');
    const quickButton = document.getElementById('quick');
    const panelButton = document.getElementById('panel');

    insertButton.addEventListener("click", retrieveTrack)
    quickButton.addEventListener("click", retrieveTrack)
    panelButton.addEventListener("click", retrieveTrack)
}



function builder_3a() {

    const template_3a = `
     <div id="main-container" class="container-xl  bd">
        <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center bd">
            <h3>Quanto hai speso?</h3>  
        </div>   
        <div class="col-12 d-flex justify-content-center align-items-center bd">
             <input type="number" id="expense-amount" step="0.01" min="0" placeholder="0.00">
        </div>    
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="mv-to-3b" data-track = "3b">Avanti</button>
                <button type="button" id="back-to-2" data-track = "2">Indietro</button>
            </div>  
        </div>
    </div>
    `
     appRoot.innerHTML=template_3a

    
    const mvTo3bButton = document.getElementById('mv-to-3b');
    const backTo2Button = document.getElementById('back-to-2');
    const expenseAmountInput = document.getElementById("expense-amount")

    if (interface3Data.amount)expenseAmountInput.value = interface3Data.amount

    
    const mvTo3b = (e) => {
        const amountValue  = expenseAmountInput.value
        if (!amountValue==0)interface3Data.amount = amountValue
        console.log(interface3Data)
        const track = e.currentTarget.dataset.track
        router(track)
    }

    mvTo3bButton.addEventListener("click", mvTo3b)
    backTo2Button.addEventListener("click", retrieveTrack)
    
}

function builder_3b() {

    const template_3b = `
    <div id="main-container" class="container-xl bd">
    <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center bd">
            <p id="amount-remember"> bho</p>  
        </div>   
        <div class="col-12 d-flex justify-content-center align-items-center bd">
            <label for="expense-reason" class="me-2">Per quale motivo:</label>
            <input type="text" id="expense-reason">
        </div>    
        <div class="col-12 d-flex justify-content-center align-items-center bd">
            <button type="button" id="mv-to-3c" data-track="3c">Avanti</button>
            <button type="button" id="back-to-3a" data-track="3a">Indietro</button>
        </div>  
    </div>
</div>
    `

    appRoot.innerHTML=template_3b

    const amountRememberPar = document.getElementById("amount-remember")
    const expenseReasonInput = document.getElementById('expense-reason');
    const mvTo3cButton = document.getElementById('mv-to-3c');
    const backTo3aButton = document.getElementById('back-to-3a');
    
    amountRememberPar.textContent = `€ ${interface3Data.amount}`

     if (interface3Data.reason)expenseReasonInput.value = interface3Data.reason


        
    const mvTo3c = (e) => {
        const reasonValue  = expenseReasonInput.value
        if (!reasonValue=="")interface3Data.reason = reasonValue
        console.log(interface3Data)
        const track = e.currentTarget.dataset.track
        router(track)
    }

    mvTo3cButton.addEventListener("click", mvTo3c)
    backTo3aButton.addEventListener("click", retrieveTrack)

}


export {router}