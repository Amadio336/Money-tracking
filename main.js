import { router, builder_0, builder_2 } from "./builder.js";


const accessConfirmInterface = document.getElementById("access-confirm")
const jwt = localStorage.getItem("token")


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
                const datiUtente = await response.json();
                builder_2()
            } else {
                builder_0()
            }

    } catch (errore) {
        console.warn("Errore durante la verifica del token:", errore.message);
        localStorage.removeItem('jwt');
    }
}


