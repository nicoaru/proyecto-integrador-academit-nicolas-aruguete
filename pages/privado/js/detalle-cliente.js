// URLparams
const params = new URLSearchParams(location.search)
const idCliente = params.get('id')

// elementos DOM
const contenedorDatosCliente = document.getElementById('contenedorDatosCliente');
const contenedorPedidosPendientes = document.getElementById('contenedorPedidosPendientes')
const contenedorPedidosEntregados = document.getElementById('contenedorPedidosEntregados')
const contenedorError = document.getElementById('contenedorError')
let btnEditar;
let btnGuardarCambios;
let btnCancelar;
let telefonoInput;
let emailInput;
let tipoClienteSelect;
let notasTextArea;



// variables para guardar la data del fetch
let cliente;
let muebles;
let tiposCliente;

// variables donde filtro los pedidos pendientes y los terminados
let pedidosPendientes = [];
let pedidosTerminados = [];
let pedidosSinMuebles = [];



/* -------------------- */


const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([
            API.getClienteById(idCliente),             
            API.getMueblesByIdCliente(idCliente),
            API.getTiposCliente()
        ])
        .then(results => {

            results[0].value ? cliente = results[0].value : console.log("Error fetch clientes: ", results[0].reason)
            console.log({cliente})

            results[1].value ? muebles = results[1].value : console.log("Error fetch muebles: ", results[1].reason) 
            console.log({muebles})

            results[2].value ? tiposCliente = results[2].value : console.log("Error fetch tiposCliente: ", results[2].reason) 
            console.log({tiposCliente})
        
            cliente ? resolve() : console.log("cliente: ", cliente);reject(results[0].reason)

        })
    })

}

const filtrarPedidosPendientesYTerminados = (arrayPedidosAFiltrar) => {
    
    arrayPedidosAFiltrar?.forEach(pedido => {

        const mueblesPedido = muebles?.filter(mueble => mueble.pedido.id === pedido.id)
        
        if(mueblesPedido.length === 0) {
            pedidosSinMuebles.push(pedido)
            return;
        }

        const esPedidoTerminado = mueblesPedido.every(mueble => {
            return mueble.estadosHistoricos.find(estado => estado.estado.id === 7)
        })
        
        if(esPedidoTerminado) pedidosTerminados.push(pedido)
        else pedidosPendientes.push(pedido)
    })
}


const imprimirDatosCliente = (cliente, elementoContenedor) => {

    const plantillaHTML = `
        <div>
            <div class="flexContainer">
                <div class="datos">
                    <h2 id="nombreCliente">${cliente?.nombre} ${cliente?.apellido}</h2>
                    <label>Telefono:
                        <input id="telefonoInput" disabled value="${cliente?.telefono}"></input>
                    </label>
                    <label>Email:
                        <input id="emailInput" disabled value="${cliente?.email}"></input>
                    </label>

                    <label for="tipoClienteSelect">Tipo cliente:
                        <select id="tipoClienteSelect" disabled>
                            ${tiposCliente.map(tipo => `<option value="${tipo.id}" ${(cliente.tipoCliente.id === tipo.id) ? 'selected' : ''}>${tipo.nombre}</option>`)}    
                        </select>                          
                    </label>
                </div>

                <div class="notas">
                    <label>Notas</label>
                    <textarea id="notasTextArea" disabled>${cliente.notas}</textarea>

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

    telefonoInput = document.getElementById('telefonoInput')
    emailInput = document.getElementById('emailInput')
    tipoClienteSelect = document.getElementById('tipoClienteSelect')
    notasTextArea = document.getElementById('notasTextArea')

}

const imprimirPedidos = (pedidos, muebles, elementoContenedor, titulo) => {
    
    if(pedidos.length === 0) return;

    const divConjuntoPedidos = document.createElement('div');
    divConjuntoPedidos.innerHTML = `<h2>${titulo}</h2>`

    /*** armo cada pedido ***/
    pedidos?.forEach(pedido => {
        const mueblesPedido = muebles?.filter(mueble => mueble.pedido.id === pedido.id)    
      
        /*** armo la lista de muebles ***/
        const itemsMuebles = mueblesPedido.map(mueble => {
            const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]

            return `
                <li>
                    ${mueble?.cantidad} x ${mueble?.modelo.nombre} . ${mueble?.largo}cm x ${mueble?.alto}cm x ${mueble?.profundidad}cm . Color: ${mueble?.color.nombre} . Estado: ${ultimoEstado?.estado.nombre}
                </li>
                `
        })
        const itemsMueblesHTML = itemsMuebles.join(" ")
        /* - */

        const html = `
        <div class="detallePedido">
            <h3>Pedido n° ${pedido?.id}</h3>
            <h4>Fecha entrega: ${pedido?.fechaEntrega ? new Date(pedido?.fechaEntrega).toLocaleDateString() : ""}</h4>
            <ul id="contenedor">
                ${itemsMueblesHTML}
            </ul>
        </div>`

        divConjuntoPedidos.innerHTML += html;
    })
    elementoContenedor.appendChild(divConjuntoPedidos);
}

const imprimirError = (mensaje, elementoContenedor) => {
    console.log({elementoContenedor})
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}



const hablitarEdicion = () => {
    telefonoInput.removeAttribute("disabled");
    emailInput.removeAttribute("disabled");
    tipoClienteSelect.removeAttribute("disabled");
    notasTextArea.removeAttribute("disabled");

    btnEditar.classList.add("hide")
    btnGuardarCambios.classList.remove("hide");
    btnCancelar.classList.remove("hide");
}

const deshabilitarEdicion = () => {
    telefonoInput.setAttribute("disabled", "");
    emailInput.setAttribute("disabled", "");
    tipoClienteSelect.setAttribute("disabled", "");
    notasTextArea.setAttribute("disabled", "");

    btnEditar.classList.remove("hide")
    btnGuardarCambios.classList.add("hide");
    btnCancelar.classList.add("hide");
}

const cancelarCambios = () => {
    telefonoInput.value = cliente.telefono
    emailInput.value = cliente.email
    tipoClienteSelect.value = cliente.tipoCliente.id
    notasTextArea.value = cliente.notas

    deshabilitarEdicion()
}

const guardarCambios = () => {
    const telefonoValue = telefonoInput.value;
    const emailValue = emailInput.value;
    const tipoClienteValue = tipoClienteSelect.value;
    const notasValue = notasTextArea.value;

    const updatedCliente = {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: telefonoValue,
        email: emailValue,
        notas: notasValue,
        tipoCliente: {id: tipoClienteValue}
    }

    console.log({updatedCliente})

    API.updateClienteById(cliente.id, updatedCliente)
    .then(result => {
        try {
            console.log("Cambios guardados: "+result)
            showModal("Cambios guardados con éxito")
            deshabilitarEdicion()              
        }
        catch(err){
            console.log(err)
        }
      
        
        API.getClienteById(cliente.id)
        .then(clienteActualizado => {
            cliente = clienteActualizado;
            console.log({cliente});
        })
        .catch(err => console.log("Error trayendo el cliente de vuelta: "+err))
    })
    .catch(err => {
        console.log({err})        
        showModal("Hubo un error guardando los cambios")
    })
}






/* -------------------- */


getConjuntoDatos()
.then(() => {
    try {
        filtrarPedidosPendientesYTerminados(cliente.pedidos);
        console.log("Pedidos en curso: ", pedidosPendientes);
        console.log("Pedidos terminados: ", pedidosTerminados);
        imprimirDatosCliente(cliente, contenedorDatosCliente);
        imprimirPedidos(pedidosPendientes, muebles, contenedorPedidosPendientes, "Pedidos en curso")
        imprimirPedidos(pedidosTerminados, muebles, contenedorPedidosEntregados, "Pedidos entregados")        
    }
    catch(err) {
        console.error("Error en el .then del final")
    }


})
.catch(err => {
    console.log("Entro en el catch")
    console.log(err)
    imprimirError("Cliente no encontrado", contenedorError)
})





/*

        // itero por cada mueble y el resultado total es si el pedido está terminado o no
        const pedidoEstaTerminado = mueblesPedido?.every(mueble => {
            // console.log("Mueble nro: ", mueble.id)  //
            // filtro los estados del mueble que estoy iterando
            let muebleEstaTerminado = false;

            // itero por cada estado y el resultado total es si el mueble está terminado o no
            if(mueble.estadosHistoricos) {
                for(const estadoHistorico of mueble.estadosHistoricos) {
                    // console.log("Estado: ", estado.id_estado)  //
                    if (estadoHistorico.estado.id === 7) {
                        muebleEstaTerminado = true
                        break
                    }
                }                    
            }
            // console.log("Mueble está terminado: ", muebleEstaTerminado)  //
            // console.log(`Mueble ${mueble.id} esta terminado? `, muebleEstaTerminado)  
            return muebleEstaTerminado   
            
        })
        
        // console.error("Pedido nro ", pedido.id, " está terminado: ", pedidoEstaTerminado)  //
    
        if(pedidoEstaTerminado) pedidosTerminados.push(pedido)
        else pedidosPendientes.push(pedido)
        */