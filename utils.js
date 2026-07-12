function get_current_date(){
    const oggi = new Date(); // Prende il momento esatto in base all'orologio del PC/telefono
    
    const anno = oggi.getFullYear();
    
    // getMonth() parte da 0 (Gennaio = 0), quindi facciamo +1.
    // padStart(2, '0') assicura che "7" diventi "07"
    const mese = String(oggi.getMonth() + 1).padStart(2, '0'); 
    
    const giorno = String(oggi.getDate()).padStart(2, '0');
    
    return `${anno}-${mese}-${giorno}`;
};

//get_current_date()


const shortcuts = [["Delia", {amount:5, reason: "Delia", category: "Sigarette"}],
                   ["Terea", {amount:5.5, reason: "Terea", category: "Sigarette"}],
                   ["Caffè Sapienza", {amount:0.5, reason: "caffe", category: "svago"}],
                   ["Carburante € 20", {amount:20, reason: "carburante € 20", category: "Carburante"}],
                   ["Carburante € 10", {amount:10, reason: "carburante € 10", category: "Carburante"}],
                   ["Rinnovo VPS", {amount: 5, reason: "Hosting server", category: "Tecnologia"}],
                   ["Cena", {amount: 40, reason: "cena", category: "Svago"}],
                   ["Ricarica", {amount: 10, reason: "ricarica", category: "abbonamenti"}],
                  ]





export {get_current_date, shortcuts}