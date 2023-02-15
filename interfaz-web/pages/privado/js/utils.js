const getPlantilla = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(resp => {
            if(resp.ok) {
                resp.text()
                .then(plantilla => {
                    console.log("plantilla ", plantilla);
                    resolve(plantilla)
                })        
            }
            else throw error(resp.statusText);
        })
        .catch(err => {
            const error = {error: true, message: err.message}
            console.log(error)
            reject(error)
        })
    })
}