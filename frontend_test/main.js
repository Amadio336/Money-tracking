const baseUrl = "http://localhost:8000"

async function crea_utente() {
    const completeUrl = `${baseUrl}/create_user`

    const payload = {
        username:"genoveffo",
        email: "genoveffo@example.com",
        plain_text_pwd: "prova"
    }

    try{
    
        const response = await fetch(completeUrl, {
        method: "POST",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Errore di rete: ${response.status}`)}
    
            
        const data = await response.json();
        console.log("Risposta dal server:", data);
    
    } catch (error){
     console.error("La chiamata è fallita:", error)}

  
    
}

async function login(username, password) {
    const completeUrl = `${baseUrl}/login`

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

  try {
    const response = await fetch(completeUrl, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/x-www-form-urlencoded'
      },
    
      body: formData 
    });

    if (!response.ok) {
      throw new Error('Credenziali errate o server irraggiungibile');
    }

    // 4. Se va tutto bene, FastAPI ci restituisce il token
    const dati = await response.json();
    console.log(dati)

    /* // 5. Salviamo il token nel browser per usarlo dopo
    localStorage.setItem('mioTokenSegreto', dati.access_token);
 */
  } catch (error) {
    console.error("Errore durante il login:", error);
  }
}

  
login("genoveffo", "prova")

