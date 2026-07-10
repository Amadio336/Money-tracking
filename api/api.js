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
            throw new Error(`Errore di rete: ${response.status}`)}
    
        if(response.status == 422){
            console.log("rivedi i dati inseriti")
            //TODO: deve creare dell'HTML per segnalare che i dati sono mal inseriti, soprattutto la mail 
        }
            
        const data = await response.json();
        console.log("Risposta dal server:", data);
    
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













 export {create_user, login}
 
 
