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















 export {create_user}
 
 
