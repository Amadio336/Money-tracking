import { routes } from "./load_json.js";



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
        console.log(dati)


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













 export {create_user, login, registerExpense}
 
 
