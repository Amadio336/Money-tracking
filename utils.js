function get_current_date(){
    const oggi = new Date(); // Prende il momento esatto in base all'orologio del PC/telefono
    
    const anno = oggi.getFullYear();
    
    // getMonth() parte da 0 (Gennaio = 0), quindi facciamo +1.
    // padStart(2, '0') assicura che "7" diventi "07"
    const mese = String(oggi.getMonth() + 1).padStart(2, '0'); 
    
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    return `${anno}-${mese}-${giorno}`;
};

get_current_date()

export {get_current_date}