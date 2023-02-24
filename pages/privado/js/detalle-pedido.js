// URLparams
const params = new URLSearchParams(location.search)
const idPedido = params.get('id')

// elementos del DOM
const contenedorDatosPedido = document.getElementById('contenedorDatosPedido');
const contenedorMueblesPendientes = document.getElementById('contenedorMueblesPendientes')
const contenedorMueblesEntregados = document.getElementById('contenedorMueblesEntregados')
const contenedorError = document.getElementById('contenedorError')

let clienteSelect;
let fechaEntregaInput;
let fechaEntradaInput;
let direccionEntregaInput;
let notasTextArea;

let btnEditar;
let btnGuardarCambios;
let btnCancelar;

// variables para guardar la data del fetch
let pedido;
let muebles;
let clientes;

// variables donde filtro los muebles pendientes y los terminados
let mueblesPendientes = [];
let mueblesTerminados = [];



/* -------------------- */



const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([
            API.getPedidoById(idPedido),        
            API.getMueblesByIdPedido(idPedido),
            API.getClientes()
        ])
        .then(results => {

            results[0].value ? pedido = results[0].value : console.log(results[0].reason)
            console.log({pedido})

            results[1].value ? muebles = results[1].value : console.log(results[1].reason)
            console.log({muebles})

            results[2].value ? clientes = results[2].value : console.log(results[2].reason)
            console.log({clientes})
            
            pedido ? resolve() : reject(results[0].reason)
        })
    })

}

const filtrarMueblesPendientesYTerminados = (arrayMueblesAFiltrar) => {
    // itero todos los muebles del pedido y lo asigno a mueblesTerminados o a mueblesPendientes, según corresponda
    arrayMueblesAFiltrar?.forEach(mueble => {
    
        const esMuebleTerminado = mueble.estadosHistoricos.find(estado => estado.estado.id === 7)
        
        if(esMuebleTerminado) mueblesTerminados.push(mueble)
        else mueblesPendientes.push(mueble)
    })
}


const imprimirDatosPedido = (pedido, elementoContenedor) => {
    
    const plantillaHTML = `
    <div>
        <div class="flexContainer">
            <div class="datos">
                <h2 id="nroPedido">Pedido N° ${pedido?.id}</h2>
                <label for="clienteSelect">Cliente:
                    <select id="clienteSelect" disabled>
                        ${clientes.map(cliente => `<option value="${cliente.id}" ${(pedido.cliente.id === cliente.id) ? 'selected' : ''}>${cliente.nombre} ${cliente.apellido}</option>`)}    
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
                <label>Estado: 
                    <input id="estadoInput" disabled value="${mueblesPendientes.length>0 ? "Pendiente" : "Terminado"}"></input>
                </label>

            </div>

            <div class="notas">
                <label>Notas</label>
                <textarea id="notasTextArea" disabled>${pedido?.notas}</textarea>

            </div>        
        </div>
        <button id="btnEditar" class="btn" >Editar</button>
        <button id="btnGuardarCambios" class="btn hide" >Guardar cambios</button>
        <button id="btnCancelar" class="btn btnRed hide" >Cancelar</button>
    </div>
    `;

    elementoContenedor.innerHTML = plantillaHTML;


    btnEditar = document.getElementById('btnEditar')
    btnEditar.addEventListener("click", hablitarEdicion)
    
    btnGuardarCambios = document.getElementById('btnGuardarCambios')
    btnGuardarCambios.addEventListener("click", guardarCambios)

    btnCancelar = document.getElementById('btnCancelar')
    btnCancelar.addEventListener("click", cancelarCambios)

    clienteSelect = document.getElementById('clienteSelect')
    fechaEntregaInput = document.getElementById('fechaEntregaInput')
    fechaEntradaInput = document.getElementById('fechaEntradaInput')
    direccionEntregaInput = document.getElementById('direccionEntregaInput')
    notasTextArea = document.getElementById('notasTextArea')

}

const imprimirMuebles = (muebles, elementoContenedor, titulo) => {
    if(muebles.length === 0) return;
    // fragment.appendChild(h2)
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

const imprimirError = (mensaje, elementoContenedor) => {
    console.log({elementoContenedor})
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}


const hablitarEdicion = () => {
    clienteSelect.removeAttribute("disabled");
    fechaEntregaInput.removeAttribute("disabled");
    fechaEntradaInput.removeAttribute("disabled");
    direccionEntregaInput.removeAttribute("disabled");
    notasTextArea.removeAttribute("disabled");

    btnEditar.classList.add("hide")
    btnGuardarCambios.classList.remove("hide");
    btnCancelar.classList.remove("hide");

    console.log(fechaEntradaInput.value)
}

const deshabilitarEdicion = () => {
    clienteSelect.setAttribute("disabled", "");
    fechaEntregaInput.setAttribute("disabled", "");
    fechaEntradaInput.setAttribute("disabled", "");
    direccionEntregaInput.setAttribute("disabled", "");
    notasTextArea.setAttribute("disabled", "");

    btnEditar.classList.remove("hide")
    btnGuardarCambios.classList.add("hide");
    btnCancelar.classList.add("hide");
}

const cancelarCambios = () => {
    clienteSelect.value = pedido.cliente.id
    fechaEntradaInput.value = getISODateStringFromUnixTime(pedido.fechaEntrada)
    fechaEntregaInput.value = getISODateStringFromUnixTime(pedido.fechaEntrega)
    direccionEntregaInput.value = pedido.direccionEntrega
    notasTextArea.value = pedido.notas

    deshabilitarEdicion()
}

const guardarCambios = () => {
    const clienteValue = clienteSelect.value;
    const fechaEntradaValue = getUnixTimeFromString(fechaEntradaInput.value);
    const fechaEntregaValue = getUnixTimeFromString(fechaEntregaInput.value);
    const direccionEntregaValue = direccionEntregaInput.value;
    const notasValue = notasTextArea.value;

    const updatedPedido = {
        direccionEntrega: direccionEntregaValue,
        fechaEntrada: fechaEntradaValue,
        fechaEntrega: fechaEntregaValue,
        notas: notasValue,
        cliente: {id: clienteValue}
    }

    console.log({updatedPedido})

    API.updatePedidoById(pedido.id, updatedPedido)
    .then(result => {
        try {
            console.log("Cambios guardados: "+result)            
            showModal("Cambios guardados")
            deshabilitarEdicion()             
        }
        catch(err) {
            console.log(err)
        }
    
        API.getPedidoById(pedido.id)
        .then(pedidoActualizado => {
            pedido = pedidoActualizado;
            console.log({pedido});
        })
        .catch(err => {
            console.log("Error trayendo el pedido de vuelta: "+err)
        })
    })
    .catch(err => {
        console.log(err)        
        showModal("Hubo un error guardando los cambios")
    })
}



/* -------------------- */


getConjuntoDatos()
.then(() => {
    try { 
        filtrarMueblesPendientesYTerminados(muebles);
        imprimirDatosPedido(pedido, contenedorDatosPedido);
        imprimirMuebles(mueblesPendientes, contenedorMueblesPendientes, "Muebles en curso")
        imprimirMuebles(mueblesTerminados, contenedorMueblesEntregados, "Muebles entregados")
    }
    catch(err) {
        console.error("Error en el .then del final: ", err)
    }

})
.catch(err => {
    console.log(err)
    imprimirError("Pedido no encontrado", contenedorError)
})




/*
                <label>Fecha entrada: 
                    <input id="fechaEntradaInput" disabled value="${ pedido.fechaEntrada ? new Date(pedido.fechaEntrada).toLocaleDateString() : "" }"></input>
                </label>
                <label>Fecha entrega: 
                    <input id="fechaEntregaInput" disabled value="${ pedido.fechaEntrega ? new Date(pedido.fechaEntrega).toLocaleDateString() : "" }"></input>
                </label>
*/                