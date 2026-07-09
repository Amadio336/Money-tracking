async function caricaJson() {
     /* get the routes from routes.json. It's due to a security problem, the routes must not be viewed in the 
        github repository */
    
    try{
        const rawData = await fetch("/api/routes.json") 
        const data = await rawData.json()
        return await data
    }
    catch(error){
        console.log(error)}
    
    
}

const routes = await caricaJson()

export {routes}