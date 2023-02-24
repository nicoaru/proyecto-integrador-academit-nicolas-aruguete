
// Formulario de contacto //
// Formulario de contacto //

const urlServer = "http://localhost:8080/JavaServer-1.0-SNAPSHOT";

const formContacto = document.getElementById('formContacto')
const enviarButton = document.getElementById('enviarButton')
const nombreInput = document.getElementById('nombreInput')
const telefonoInput = document.getElementById('telefonoInput')
const textoConsultaInput = document.getElementById('textoConsultaInput')

const fetchConsulta = (consulta) => {
    return fetch(urlServer+'/api/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    })
}




const enviarConsulta = async(nombre, telefono, textoConsulta, elementoFormulario) => {
    let consulta = {nombre, telefono, textoConsulta}

    fetchConsulta(consulta)
    .then(resp => {
        if(resp.ok) {
            console.log("Consulta enviada con éxito")
        }
        else {
            console.log("Hubo un error con el servidor. Intentalo de nuevo más tarde")
            elementoFormulario.reset()
        }
        elementoFormulario.reset()
    })
    .catch(err => {
        console.log("Tuvimos un error enviando tu consuta... Intentalo nuevamente más tarde")
        elementoFormulario.reset()
    })
   
}



enviarButton.onclick = (event) => {
    event.preventDefault();
    const nombreValue = nombreInput.value;
    const telefonoValue = telefonoInput.value;
    const textoConsultaValue = textoConsultaInput.value;
    enviarConsulta(nombreValue, telefonoValue, textoConsultaValue, formContacto);    
}

/*
enviarButton.addEventListener('onclick', (event) => {
    event.preventDefault();
    const nombreValue = nombreInput.value;
    const telefonoValue = telefonoInput.value;
    const textoConsultaValue = textoConsultaInput.value;
    enviarConsulta(nombreValue, telefonoValue, textoConsultaValue);    
})
*/