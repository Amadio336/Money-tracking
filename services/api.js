import { routes } from "./load_json.js";
import { router, builder_0, builder_2 } from "../builder.js";


async function create_user(payload) {
    const completeUrl = routes.create_user

    try{    
        const response = await fetch(
            completeUrl, 
            {
                method: "POST",
                headers:  {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)}
        )
        

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Dettaglio dell'errore 422 da FastAPI:", JSON.stringify(errorDetails, null, 2));
            throw new Error(`Errore di rete: ${response.status}`);
        }
    
        if(response.status == 422){
            console.log("rivedi i dati inseriti")
            //TODO: deve creare dell'HTML per segnalare che i dati sono mal inseriti, soprattutto la mail 
        }
            
        const data = await response.json();
        return data
    
    } catch (error){
     console.error("Error - request failed: ", error)}
}


async function login(username, password) {
    const completeUrl = routes.login

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch(
            completeUrl, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData }
        )

        //TODO: to remove
        console.log(response)

        if (!response.ok) {
        throw new Error('Credentials invalid or server unreachable');
        }

        const dati = await response.json();
  


        localStorage.setItem('token', dati.access_token);

        //create a custom EL to notify that login has succedeed
        const loginEvent = new CustomEvent("loginSuccess")
        document.dispatchEvent(loginEvent)

        

    } catch (error) {
    console.error("Errore durante il login:", error)}

}




async function registerExpense(payload) {
    const completeUrl = routes.register_expense

    try{    
        const response = await fetch(
            completeUrl, 
            {
                method: "POST",
                headers:  {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                },
                body: JSON.stringify(payload)
            }
        )
        

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Dettaglio dell'errore 422 da FastAPI:", JSON.stringify(errorDetails, null, 2));
            throw new Error(`Errore di rete: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Expense recorded succesfully", data)

        const expenseRecordedEvent = new CustomEvent("expense-recorded")
        document.dispatchEvent(expenseRecordedEvent)
  
    
    } catch (error){
     console.error("Error - request failed: ", error)}


    

}

const jwt = localStorage.getItem("token")
async function get_me(jwt) {
    if (!jwt){
            builder_0()
    }else{
                try {
                    const response = await fetch('http://83.228.242.118/api/me', {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}` 
                        }})

            
                    if (response.ok) {
                        // it contains the username and email of the user whose jwt has been sent
                        const data = await response.json();
                        localStorage.setItem("username", data.username)
                        builder_2()
                    } else {
                        builder_0()
                    }

            } catch (errore) {
                console.warn("Errore durante la verifica del token:", errore.message);
                localStorage.removeItem('jwt');
            }
        }

    
}

async function getAllExpense() {
    const completeUrl = routes.get_all_expenses
    console.log("cosa c'è dietro ", completeUrl)
    try{    
        const response = await fetch(
            completeUrl, 
            {
                method: "GET",
                headers:  {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
        

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Dettaglio", JSON.stringify(errorDetails, null, 2));
            throw new Error(`Errore di rete: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Expense stored succesfully", data)
        return data

  
    
    } catch (error){
     console.error("Error - request failed: ", error)}




    
}









 export {create_user, login, registerExpense, get_me, getAllExpense}
 
 
