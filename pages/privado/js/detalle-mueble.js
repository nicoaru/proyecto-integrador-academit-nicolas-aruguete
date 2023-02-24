// URLparams
const params = new URLSearchParams(location.search)
const idMueble = params.get('id')

// elementos del DOM
const contenedorDatosMueble = document.getElementById('contenedorDatosMueble');
const contenedorDatosPedido = document.getElementById('contenedorDatosPedido');
const contenedorOtrosMueblesPedido = document.getElementById('contenedorOtrosMueblesPedido')
const contenedorError = document.getElementById('contenedorError')

let modeloInput;
let estadoSelect;
let cantidadInput;
let largoInput;
let altoInput;
let profundidadInput;
let colorSelect
let fechaEntregaInput
let notasTextArea

let btnEditar;
let btnGuardarCambios;
let btnCancelar;


// variables para guardar la data del fetch
let mueble;
let otrosMueblesPedido;
let estados;
let colores;

let ultimoEstadoMueble;




/* -------------------- */




const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        API.getMuebleById(idMueble)
        .then(async data => {
            mueble = data;
            const idPedido = mueble.pedido.id
            console.log(mueble)

            ultimoEstadoMueble = mueble.estadosHistoricos.sort((a,b) => a.fecha - b.fecha)[mueble.estadosHistoricos.length - 1]

            await API.getMueblesByIdPedido(idPedido)
            .then(data => {
                otrosMueblesPedido = data
            })
            .catch(err => { console.log({err}) })

            await API.getEstados()
            .then(data => {
                estados = data
            })
            .catch(err => { console.log({err}) })

            await API.getColores()
            .then(data => {
                colores = data
            })
            .catch(err => { console.log({err}) })

            resolve()
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })

}



const imprimirDatosMueble = (mueble, elementoContenedor) => {
    
    const plantillaHTML = `
    <div>
        <div class="flexContainer">
            <div class="datos">              
                <input class="h-2" id="modeloInput" disabled value="${mueble.modelo.nombre}"></input>
                <label>Id: 
                    <input class="" id="idMuebleInput" disabled value="${mueble.id}"></input>
                </label/>
                <label>Fecha entrega: 
                    <input id="fechaEntregaInput" disabled value="${getLocaleDateStringFromUnixTime(mueble.pedido.fechaEntrega)}"></input>
                </label>           
                <label for="estadoSelect">Estado:
                    <select id="estadoSelect" disabled>
                        ${estados.map(estado => `<option value="${estado.id}" ${(ultimoEstadoMueble.estado.id === estado.id) ? 'selected' : ''}>${estado.nombre}</option>`)}    
                    </select>                          
                </label>                         

                <label>Largo: 
                    <input id="largoInput" disabled value="${mueble.largo}"></input>
                </label>

                <label>Alto: 
                    <input id="altoInput" disabled value="${mueble.alto}"></input>
                </label>

                <label>Profundidad: 
                    <input id="profundidadInput" disabled value="${mueble.profundidad}"></input>
                </label>

                <label for="colorSelect">Color:
                    <select id="colorSelect" disabled>
                        ${colores.map(color => `<option value="${color.id}" ${(mueble.color.id === color.id) ? 'selected' : ''}>${color.nombre}</option>`)}    
                    </select>                          
                </label>      

                <label>Cantidad: 
                    <input id="cantidadInput" disabled value="${mueble.cantidad}"></input>
                </label>                
            </div>

            <div class="notas">
                <label>Notas</label>
                <textarea id="notasTextArea" disabled>${mueble.notas}</textarea>
            </div>        
        </div>
        <button id="btnEditar" class="btn" >Editar</button>
        <button id="btnGuardarCambios" class="btn hide" >Guardar cambios</button>
        <button id="btnCancelar" class="btn btnRed hide" >Cancelar</button>
    </div>
    `;

    elementoContenedor.innerHTML = plantillaHTML;


    btnEditar = document.getElementById('btnEditar')
    btnEditar.addEventListener("click", habilitarEdicion)
    
    btnGuardarCambios = document.getElementById('btnGuardarCambios')
    btnGuardarCambios.addEventListener("click", guardarCambios)

    btnCancelar = document.getElementById('btnCancelar')
    btnCancelar.addEventListener("click", cancelarCambios)

    modeloInput = document.getElementById('modeloInput')
    estadoSelect = document.getElementById('estadoSelect')
    cantidadInput = document.getElementById('cantidadInput')
    largoInput = document.getElementById('largoInput')
    altoInput = document.getElementById('altoInput')
    profundidadInput = document.getElementById('profundidadInput')
    colorSelect = document.getElementById('colorSelect')
    fechaEntregaInput = document.getElementById('fechaEntregaInput')
    notasTextArea = document.getElementById('notasTextArea')

}

const imprimirDatosPedido = (pedido, elementoContenedor) => {
    
    const plantillaHTML = `
    <div>
        <div class="flexContainer">
            <div class="datos">
                <h2 id="nroPedido">Pedido N° ${pedido?.id}</h2>
                <label for="clienteSelect">Cliente:
                    <select id="clienteSelect" disabled>
                        ${`<option value="${pedido.cliente.id}"}>${pedido.cliente.nombre} ${pedido.cliente.apellido}</option>`}    
                    </select>                          
                </label>
                <label>Fecha entrada: 
                    <input type="date" id="fechaEntradaInput" disabled value="${getISODateStringFromUnixTime(pedido.fechaEntrada)}"></input>
                </label>
                <label>Fecha entrega: 
                    <input type="date" id="fechaEntregaInput" disabled value="${getISODateStringFromUnixTime(pedido.fechaEntrega)}"></input>
                </label>

                <label>Dirección entrega: 
                    <input id="direccionEntregaInput" disabled value="${pedido.direccionEntrega}"></input>
                </label>

            </div>

            <div class="notas">
                <label>Notas</label>
                <textarea id="notasTextArea" disabled>${pedido?.notas}</textarea>

            </div>        
        </div>
    </div>
    `;

    elementoContenedor.innerHTML = plantillaHTML;
}

const imprimirMuebles = (muebles, elementoContenedor, titulo) => {
    if(muebles.length === 0) return;

    const divConjuntoMuebles = document.createElement('div')

    /*** armo la lista de muebles ***/
    const itemsMuebles = muebles.map(mueble => {
        const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]

        return `
            <li>
                ${mueble?.cantidad} x ${mueble?.modelo.nombre} . ${mueble?.largo}cm x ${mueble?.alto}cm x ${mueble?.profundidad}cm . Color: ${mueble?.color.nombre} . Estado: ${ultimoEstado?.estado.nombre}
            </li>
            `
    })
    const itemsMueblesHTML = itemsMuebles.join(" ")
    /* - */
    
    html = `
    <h2>${titulo}</h2>
    <ul>
        ${itemsMueblesHTML}
    </ul>
    `

    divConjuntoMuebles.innerHTML = html;
    elementoContenedor.appendChild(divConjuntoMuebles);

}

const imprimirMuesdfbles = (muebles, elementoContenedor, titulo) => {
console.log({elementoContenedor})
    // const fragment = new DocumentFragment;
    const h2 = document.createElement('h2')
    h2.textContent = titulo
    // fragment.appendChild(h2)
    const div = document.createElement('div')
    div.appendChild(h2)

    muebles.forEach(mueble => {               
        const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]
        
        div.innerHTML += `<div>
            <p>
            ${mueble.cantidad} x ${mueble.modelo.nombre} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${mueble.color.nombre} . Estado: ${ultimoEstado.estado.nombre}
            </p>
        </div>`
    })
    elementoContenedor.appendChild(div)
}

const imprimirError = (mensaje, elementoContenedor) => {
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}



const habilitarEdicion = () => {
    // modeloInput.removeAttribute("disabled");
    estadoSelect.removeAttribute("disabled");
    cantidadInput.removeAttribute("disabled");
    largoInput.removeAttribute("disabled");
    altoInput.removeAttribute("disabled");
    profundidadInput.removeAttribute("disabled");
    colorSelect.removeAttribute("disabled");
    notasTextArea.removeAttribute("disabled");
    
    btnEditar.classList.add("hide")
    btnGuardarCambios.classList.remove("hide");
    btnCancelar.classList.remove("hide");

}

const deshabilitarEdicion = () => {
    // modeloInput.setAttribute("disabled", "");
    estadoSelect.setAttribute("disabled", "");
    cantidadInput.setAttribute("disabled", "");
    largoInput.setAttribute("disabled", "");
    altoInput.setAttribute("disabled", "");
    profundidadInput.setAttribute("disabled", "");
    colorSelect.setAttribute("disabled", "");
    notasTextArea.setAttribute("disabled", "");

    btnEditar.classList.remove("hide")
    btnGuardarCambios.classList.add("hide");
    btnCancelar.classList.add("hide");
}

const cancelarCambios = () => {
    // modeloInput.value = mueble.modelo.nombre
    estadoSelect.value = ultimoEstadoMueble.estado.id
    cantidadInput.value = mueble.cantidad
    largoInput.value = mueble.largo
    altoInput.value = mueble.alto
    profundidadInput.value = mueble.profundidad
    colorSelect.value = mueble.color.id
    notasTextArea.value = mueble.notas

    deshabilitarEdicion()
}

const guardarCambios = () => {
    // const modeloValue = modeloInput.value;
    const estadoValue = Number(estadoSelect.value);
    const cantidadValue = Number(cantidadInput.value);
    const largoValue = Number(largoInput.value);
    const altoValue = Number(altoInput.value);
    const profundidadValue = Number(profundidadInput.value);
    const colorValue = colorSelect.value;
    const notasValue = notasTextArea.value;

    const updatedMueble = {
        modelo: {id: mueble.modelo.id},       
        cantidad: cantidadValue,
        largo: largoValue,
        alto: altoValue,
        profundidad: profundidadValue,
        color: {id: colorValue},
        notas: notasValue,
        pedido: {id: mueble.pedido.id}
    }

    let newEstado = null;
    if(estadoValue !== ultimoEstadoMueble.estado.id) {
        console.log("creando nuevo estado")
        console.log(`estadoValue: ${estadoValue} --- estadoMueble: ${ultimoEstadoMueble.estado.id}`)
        newEstado = {
            fecha: new Date().getTime(),
            id_mueble: mueble.id,
            estado: {id: estadoValue}
        }        
    }


    console.log({updatedMueble})
    console.log({newEstado})


    API.updateMuebleById(mueble.id, updatedMueble)
    .then(result => {
        try {
            alert("Cambios guardados")
            console.log("Update pedido realiado con éxito: "+result)
            deshabilitarEdicion()             
        }
        catch(err) {
            console.log(err)
        }

        API.getMuebleById(mueble.id)
        .then(muebleActualizado => {
            mueble = muebleActualizado;
            console.log({mueble});
        })
        .catch(err => {
            console.log("Error trayendo el pedido de vuelta: "+err)
        })


        if(newEstado) {
            API.createEstadoHistorico(newEstado)
            .then(idGenerated => {
                console.log("Estado creado con éxito: ",{idGenerated});

                API.getEstadoHistoricoById(idGenerated)
                    .then(estadoHistoricoCreado => {
                        const nuevoEstadoHistorico = estadoHistoricoCreado;
                        console.log({nuevoEstadoHistorico});
                    })
                    .catch(err => {
                        console.log("Error trayendo el pedido de vuelta: "+err)
                })
            })
            .catch(err => {
                console.log("Error creando nuevo estado: "+err)
            })
        }
        else {
            console.log("No hubo cambio de estado")
        }

    })
    .catch(err => {
        alert("Hubo un error guardando los cambios")
        console.log(err)
    })
}





/* -------------------- */





getConjuntoDatos()
.then(() => {
    try {
        imprimirDatosMueble(mueble, contenedorDatosMueble)
        imprimirDatosPedido(mueble.pedido, contenedorDatosPedido);
        imprimirMuebles(otrosMueblesPedido, contenedorOtrosMueblesPedido, "Otros muebles del mismo pedido")        
    }
    catch(err) {
        console.log(err)
    }

})
.catch(err => {
    console.log("ERROR: ", err)
    imprimirError("Mueble no encontrado", contenedorError)
})






/*
const imprimirDatghfosMueble = (mueble, elementoContenedor) => {
    const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]
    const plantilla_FAIL = `<h2>Pedido no encontrado</h2>`;
    const plantilla_OK = `
        <p>
            ${mueble.cantidad} x ${mueble.modelo.nombre} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${mueble.color.nombre} . Estado: ${ultimoEstado.estado.nombre}
        </p>`
    
    if(mueble) elementoContenedor.innerHTML = plantilla_OK;
    else elementoContenedor.innerHTML = plantilla_FAIL;  
}
*/