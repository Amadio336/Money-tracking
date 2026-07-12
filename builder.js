import { create_user, login, registerExpense, get_me, getAllExpense, generateReport } from "./services/api.js";
import { get_current_date, shortcuts } from "./utils.js";


const appRoot = document.getElementById("app-root")

function router(track, data = null) {
    if (track == "0"){
        builder_0()
    }
    else if (track == "1a"){
       builder_1a()
    }
    else if (track == "1b"){
      builder_1b()
    }
    else if (track == "2"){
        builder_2(data)
    }
    else if (track == "3a"){
        builder_3a()
    }
    else if (track == "3b"){
       builder_3b()
    }
    else if (track == "3c"){
       builder_3c()
    }
    else if (track == "3d"){
       builder_3d()
    }
    else if (track == "4a"){
       builder_4a()
    }
    else if (track == "5a"){
      builder_5a()
    }
}




const retrieveTrack = (e) => {
    const track = e.currentTarget.dataset.track
    router(track)

}



let interface3Data = {}



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
     const registrationButton = document.getElementById("registration-button")

     loginButton.addEventListener("click", retrieveTrack )
     registrationButton.addEventListener("click", retrieveTrack)
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

    const signIn = async function(){
        const username = usernameLoginInput.value
        const plain_text_pwd = passwordLoginInput.value
        const data = await login(username, plain_text_pwd)
       
    
        
    }
    
    const routerTo2= ()=>{
        get_me(localStorage.getItem("token"))
        router("2")
    }

    submitLoginButton.addEventListener("click", signIn)
    document.addEventListener("loginSuccess", routerTo2 )


    backButtonTo0.addEventListener("click", retrieveTrack)

    
}


function builder_1b() {

    const template_1b = `
       <div id="main-container" class="container-xl bd">
        <div class="row g-3 mb-4">
            <div class="col-12 d-flex justify-content-center align-items-center bd">
               <form id="registration-form">
    
                        <div>
                            <label for="username-input-reg">Nome Utente:</label><br>
                            <input 
                                type="text" 
                                id="username-input-reg" 
                                name="username" 
                                required 
                                autocomplete="username"
                            >
                        </div>
                        <br>

                        <div>
                            <label for="email-input-reg">Indirizzo Email:</label><br>
                            <input 
                                type="email" 
                                id="email-input-reg" 
                                name="email" 
                                required 
                                autocomplete="email"
                            >
                        </div>
                        <br>

                        <div>
                            <label for="password-input-reg">Password:</label><br>
                            <input 
                                type="password" 
                                id="password-input-reg" 
                                name="password" 
                                required 
                                autocomplete="new-password"
                            >
                        </div>
                        <br>

                        <button type="button" id="submit-registration">Registrati</button>

                    </form>
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <p> <strong>Nota:</strong> il login avverrà tramite username e password, si prega quindi di ricordarli. L'email serve solo per ricevere resoconti, mentre è insignificante per quanto
                riguarda la procedura di login. <br> <strong>Al momento non è disponibile un'operazione di reset di nome utente e password</strong></p>
            </div>  
           
        </div>
        </div>
    `

    appRoot.innerHTML = template_1b

    const usernameInputReg = document.getElementById('username-input-reg');
    const emailInputReg = document.getElementById('email-input-reg');
    const passwordInputReg = document.getElementById('password-input-reg');
    const submitRegistration = document.getElementById('submit-registration');

    

    const createUserWrapper = async () =>{
        const payload = {username:usernameInputReg.value, email:emailInputReg.value, plain_text_pwd:passwordInputReg.value}
        const data = await create_user(payload)

        if (data) {
            const UserCreatedEvent = new CustomEvent("user-created")
            document.dispatchEvent(UserCreatedEvent)

            document.addEventListener("user-created", router("1a")) 

        }


    }
    submitRegistration.addEventListener("click", createUserWrapper)
    
}


function builder_2() {
  

    const template_2 = `
        <div id="main-container" class="container-xl  bd">
        <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-center bd">
               <p id="whoami">   </p>
            </div>
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
    const whoamiPar = document.getElementById('whoami');

    whoamiPar.textContent = `Ciao ${localStorage.getItem("username")}`

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
            <p class="remember" id="amount-remember"> bho</p>  
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

function builder_3c() {

    const template_3c = `
     <div id="main-container" class="container-xl bd">
        <div class="row g-3 mb-4">
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <p class="remember" id="amount-remember"></p>  
                <p class="remember" id="reason-remember"></p>  
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <label for="expense-category" class="me-2">Categoria: </label>
                <input type="text" id="expense-category">
            </div>    
            <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="mv-to-3d" data-track="3d">Avanti</button>
                <button type="button" id="back-to-3b" data-track="3b">Indietro</button>
            </div>  
        </div>
        <div class="row g-3">
            <div class="col-6 col-lg-3 category bd">Sigarette</div>
            <div class="col-6 col-lg-3 category bd">Carburante</div>
            <div class="col-6 col-lg-3 category bd">Svago</div>
            <div class="col-6 col-lg-3 category bd">Macchina</div>
            <div class="col-6 col-lg-3 category bd">Salute e Farmacia</div>
            <div class="col-6 col-lg-3 category bd">Trasporti Pubblici</div>
            <div class="col-6 col-lg-3 category bd">Ristoranti e Bar</div>
            <div class="col-6 col-lg-3 category bd">Abbigliamento</div>
            <div class="col-6 col-lg-3 category bd">Abbonamenti</div>
            <div class="col-6 col-lg-3 category bd">Regali</div>
            <div class="col-6 col-lg-3 category bd">Imprevisti</div>
        </div>
        </div>



    `
     appRoot.innerHTML=template_3c

     const amountRememberPar = document.getElementById("amount-remember")
     const reasonRememberPar = document.getElementById("reason-remember")
     const expenseCategoryInput = document.getElementById("expense-category")
     const mvTo3dButton = document.getElementById('mv-to-3d');
     const backTo3bButton = document.getElementById('back-to-3b');

    //they populate the <p> 
    amountRememberPar.textContent = `€ ${interface3Data.amount}`
    reasonRememberPar.textContent = `€ ${interface3Data.reason}`

    if (interface3Data.category) expenseCategoryInput.value = interface3Data.category




    const categories = document.querySelectorAll(".category")
    const selectCategory = (e) => {
        const cat = e.currentTarget.textContent
        expenseCategoryInput.value = cat
        interface3Data.category = cat
        console.log(interface3Data)

    }
    categories.forEach(category =>{
        category.addEventListener("click", selectCategory)
    })
     
    const mvTo3d = (e) => {
        const categoryValue  = expenseCategoryInput.value
        if (!categoryValue=="")interface3Data.category = categoryValue
        console.log(interface3Data)
        const track = e.currentTarget.dataset.track
        router(track)
    }

    mvTo3dButton.addEventListener("click", mvTo3d)
    backTo3bButton.addEventListener("click", retrieveTrack)



}


function builder_3d() {

    const template_3d = `
    
         <div id="main-container" class="container-xl bd">
            <div class="row g-3 mb-4">
             <div class="col-12 d-flex justify-content-center align-items-center bd">
                <p class="remember" id="amount-remember"></p>  
                <p class="remember" id="reason-remember"></p>  
                <p class="remember" id="category-remember"></p>  
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <button type="button" id="mv-to-2" data-track="2" class="mb-3">Avanti</button>
                <button type="button" id="back-to-3c" data-track="3c" class="mb-3">Indietro</button>
            </div>  
         </div>
        </div>

    `
    appRoot.innerHTML=template_3d

    const amountRemember = document.getElementById('amount-remember');
    const reasonRemember = document.getElementById('reason-remember');
    const categoryRemember = document.getElementById('category-remember');
    
    amountRemember.textContent = interface3Data.amount
    reasonRemember.textContent = interface3Data.reason
    categoryRemember.textContent = interface3Data.category
    
    const SubmitExpenseRecord = document.getElementById("mv-to-2")
    const backTo3cButton= document.getElementById("back-to-3c")


    const today = get_current_date()
    interface3Data.when = today


    const registerEpenseWrapper = () => {registerExpense(interface3Data)}

    SubmitExpenseRecord.addEventListener("click", registerEpenseWrapper)
    backTo3cButton.addEventListener("click", retrieveTrack)

    const mvTo2 = () => {
        interface3Data = {}
        router("2")
    }
    document.addEventListener("expense-recorded", mvTo2)




    
}







function builder_4a() {

     const template_4a = `
    
         <div id="main-container" class="container-xl bd">
            <div id="row-to-append" class="row g-3 mb-4">
            
         </div>
        </div>

    `
    appRoot.innerHTML = template_4a

    const checkout = (e) => {
        const idShortcut = e.currentTarget.dataset.id
        const payload = shortcuts[idShortcut][1]
        builder_4b(idShortcut,payload)
    }

    /* this block (block 1) create in the DOM the shortctus and enables the EL*/
    function createShortcut(where, sh, index) {
        const col = document.createElement("div")
        col.classList.add('col-6','col-lg-3', 'd-flex', 'justify-content-center', 'align-items-center','shortcut', 'bd')
        col.textContent = sh[0]
        col.dataset.id = index
        where.appendChild(col)

    
        col.addEventListener("click", checkout)

    }
    
    const rowToAppend = document.getElementById("row-to-append")
    shortcuts.forEach((sh, index) => {
        createShortcut(rowToAppend, sh, index)
    })
    /* end block 1 */

    
}

function builder_4b(idShortcut, payload) {
        const template_4b = `
    
             <div id="main-container" class="container-xl bd">
            <div class="row g-3 mb-4">
             <div class="col-12 d-flex justify-content-center align-items-center bd">
                <p class="remember" id="amount-remember"></p>  
                <p class="remember" id="reason-remember"></p>  
                <p class="remember" id="category-remember"></p>  
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <button type="button" id="register-rapid-expense" data-track="2" class="mb-3">invia</button>
                <button type="button" id="back-to-4a" data-track="4a" class="mb-3">Indietro</button>
            </div>  
         </div>
        </div>
    
    `

    appRoot.innerHTML = template_4b
    
    const amountRemember = document.getElementById('amount-remember');
    const reasonRemember = document.getElementById('reason-remember');
    const categoryRemember = document.getElementById('category-remember');

    amountRemember.textContent = payload.amount
    reasonRemember.textContent = payload.reason
    categoryRemember.textContent = payload.category

    const today = get_current_date()
    payload.when = today

    const registerRapidExpenseButton = document.getElementById("register-rapid-expense")
    const backTo4aButton = document.getElementById("back-to-4a")

    const registerRapidExpenseWrapper = () => {
        registerExpense(payload)
        builder_2()
    }

    registerRapidExpenseButton.addEventListener("click",registerRapidExpenseWrapper)
    backTo4aButton.addEventListener("click", retrieveTrack)

    
}



function builder_5a() {

        const template_5a = `
    
             <div id="main-container" class="container-xl bd">
            <div class="row g-3 mb-4">
             <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="get_all_expense" class="mb-3">Recupera tutte le spese</button>
            </div>   
             <div class="col-12 d-flex justify-content-center align-items-center bd">
                <button type="button" id="rapid-report" class="mb-3">Resoconto Rapido</button>
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <button type="button" id="back-to-2" data-track="2" class="mb-3">Indietro</button>
            </div>  
         </div>
        </div>
    
    `

    appRoot.innerHTML = template_5a

    // back button
    const backTo2Button = document.getElementById("back-to-2")
    // get all expenses button
    const getAllExpensesButton = document.getElementById("get_all_expense")

    const manageAllExpense = async () => {
        const expensesByUser = await getAllExpense()
        builder_5b(expensesByUser)
    }

    //get rapid report button
    const getRapidRecordButton = document.getElementById("rapid-report")

   
    

   
    getAllExpensesButton.addEventListener("click", manageAllExpense)
    getRapidRecordButton.addEventListener("click", builder_5c)
    backTo2Button.addEventListener("click", retrieveTrack)
    
}


function builder_5b(expenses) {
    /* this function creates in the DOM the tabel with all the expenses */
     const template_5b = `
    
             <div id="main-container" class="container-xl bd">
            <div class="row g-3 mb-4">
             <div id="expenses-container" class="col-12 d-flex flex-column justify-content-center align-items-center bd">
               
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <button type="button" id="back-to-2" data-track="2" class="mb-3">Fatto</button>
            </div>  
         </div>
        </div>
    
    `
    appRoot.innerHTML = template_5b

    
    function createExpenseWidget(expense, where) {
        const templateWidget = `
        
        <div class="expense-widget mb-5 mt-5">
            <span style="display:block;" class="date-widget">${expense.when}</span>
            <span style="display:block;" class="amount-widget">${expense.amount}</span>
            <span style="display:block;" class="reason-widget">${expense.reason}</span>
            <span style="display:block;" class="category-widget">${expense.category}</span>
        </div>
        
        `
    
        where.insertAdjacentHTML('beforeend', templateWidget);
    }

    
    const expensesContainer = document.getElementById("expenses-container")

    expenses.forEach((expense)=>{createExpenseWidget(expense, expensesContainer)})


     
    const backTo2Butonn = document.getElementById("back-to-2")
    backTo2Butonn.addEventListener("click", retrieveTrack)
    
    
}



function builder_5c() {
    /* TODO: Note: this function takes in acocunt only the months, that means it generates the report given by a certain month. It does not care about the year, when you'll have so many 
    records that they cover more yeasr, you have to change entirely the code (also the api > see main.py > get_report because it queries the db only for the months.) */

    const template_5c = `

        <div id="main-container" class="container-xl bd">
            <div class="row g-3 mb-4">
             <div class="col-12 d-flex justify-content-center align-items-center bd">
            </div>   
             <div class="col-12 d-flex justify-content-center align-items-center bd">
             <select id="month-selector" class="form-select w-auto">
                    <option value="" disabled selected>Scegli un mese...</option>
                    <option value="1">Gennaio</option>
                    <option value="2">Febbraio</option>
                    <option value="3">Marzo</option>
                    <option value="4">Aprile</option>
                    <option value="5">Maggio</option>
                    <option value="6">Giugno</option>
                    <option value="7">Luglio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Settembre</option>
                    <option value="10">Ottobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Dicembre</option>
                </select>
                            
            </div>   
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
               <div class="report" id="space-for-report"> </div>
            </div>  
            <div class="col-12 d-flex justify-content-center align-items-center bd flex-column">
                <button type="button" id="back-to-2" data-track="2" class="mb-3">Fatto</button>
            </div>  
         </div>
        </div>


    `

    appRoot.innerHTML=template_5c


    const spaceForReport = document.getElementById("space-for-report")
    const monthSelect = document.getElementById("month-selector")

    function generateReportWidget(report, where) {
        for (const [categoria, importo] of Object.entries(report)) {

            const newPar = document.createElement("p");
            newPar.classList.add("category-report");
            newPar.textContent = `${categoria}: ${importo} €`;
            where.appendChild(newPar);

        }
    }


    const generateReportWrapper = async (e) => {  
        const monthSelected = e.target.value;
        const report = await generateReport(monthSelected)
        generateReportWidget(report, spaceForReport)
    
    }


    monthSelect.addEventListener("change", generateReportWrapper)

    const backTo2Butonn = document.getElementById("back-to-2")
    backTo2Butonn.addEventListener("click", retrieveTrack)
    
}

export {router, builder_0, builder_2}