//** FECHAS **//
const getISODateStringFromUnixTime = (unixTime) => {
    try {
        if(!unixTime) return ""
        else {
            const date = new Date(unixTime)
            const isoString = date.toISOString()
            const isoDateString = isoString.split('T')[0]        
            return isoDateString                 
        }
    }
    catch(err) {
        console.log("Error en getISODateStringFromUnixTime: ", err)
        return ""
    }
}

const getLocaleDateStringFromUnixTime = (unixTime) => {
    try {
        if(!unixTime) return ""
        else {
            const date = new Date(unixTime)
            const localeDateString = date.toLocaleDateString()
            return localeDateString          
        }
    }   
    catch(err) {
        console.log("Error en getISODateStringFromUnixTime: ", err)
        return ""
    }
}

const getUnixTimeFromString = (DateString) => {
    const date = new Date(DateString)
    const unixTime = date.getTime()
    return unixTime
}


//** MODAL **/

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn= document.getElementById('closeModalBtn')

const showModal = (msg) => {
    console.log("Entró showmodal")
    console.log()

    modalBody.innerHTML = `<h4>${msg}</h4>`
    modal.dataset.show = 'true';
}

const closeModal = () => {
    modal.dataset.show = 'false';
}

closeModalBtn.onclick = closeModal;