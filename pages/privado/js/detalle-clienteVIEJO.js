// URLparams
const params = new URLSearchParams(location.search)
const idCliente = params.get('id')

// contenedores
const contenedorDatosCliente = document.getElementById('contenedorDatosCliente');
const contenedorPedidosPendientes = document.getElementById('contenedorPedidosPendientes')
const contenedorPedidosEntregados = document.getElementById('contenedorPedidosEntregados')
const contenedorError = document.getElementById('contenedorError')
console.log({contenedorError})

// variables para guardar la data del fetch
let cliente;
let muebles;

// variables donde filtro los pedidos pendientes y los terminados
let pedidosPendientes = [];
let pedidosTerminados = [];



const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([
            API.getClienteById(idCliente),             
            API.getMueblesByIdCliente(idCliente)
        ])
        .then(results => {

            results[0].value ? cliente = results[0].value : console.log("Error fetch clientes: ", results[0].reason)
            console.log({cliente})

            results[1].value ? muebles = results[1].value : console.log("Error fetch muebles: ", results[1].reason) 
            console.log({muebles})
        
            cliente ? resolve() : console.log("cliente: ", cliente);reject(results[0].reason)

        })
    })

}

const filtrarPedidosPendientesYTerminados = (arrayPedidosAFiltrar) => {
    
    // itero todos los pedidos del cliente y lo asigno a pedidosTerminados o a pedidosPendientes, según corresponda
    arrayPedidosAFiltrar?.forEach(pedido => {
        // console.error("Pedido nro ", pedido.id)  //
        // filtro los muebles que sean del pedido que estoy iterando
        const mueblesPedido = muebles?.filter(mueble => mueble.pedido.id === pedido.id)
        
        if(mueblesPedido.length === 0) {
            return;
        }

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
    })
}


const imprimirDatosCliente = (cliente, elementoContenedor) => {

    const plantillaHTML = `
        <h2 id="nombreCliente">${cliente?.nombre} ${cliente?.apellido}</h2>
        <div>
            <div>
                <p><span class="datos-nombreDato">Teléfono:</span> ${cliente?.telefono}</p>
                <p><span class="datos-nombreDato">Email:</span> ${cliente?.email}</p>
                <p><span class="datos-nombreDato">Dirección:</span> ${cliente?.direccion}</p>
                <p><span class="datos-nombreDato">Tipo cliente:</span> ${cliente?.tipo_cliente}</p>        
            </div>
            <div>
                <p><span class="datos-nombreDato">Notas</span></p>
                <p class="datos-notas">${cliente?.notas}</p>
            </div>        
        </div>

    `;

    elementoContenedor.innerHTML = plantillaHTML;
}

const imprimirPedidos = (pedidos, muebles, elementoContenedor, titulo) => {

    if(!muebles) titulo = "Pedidos (pero ojo que falló la descarga de algunos datos)"
    const divConjuntoPedidos = document.createElement('div');
    const h2 = document.createElement('h2')
    h2.textContent = titulo
    divConjuntoPedidos.appendChild(h2)


    pedidos?.forEach(pedido => {
        const mueblesPedido = muebles?.filter(mueble => mueble.pedido.id === pedido.id)    
        const esPedidoPendiente = !mueblesPedido.every(mueble => {
            return mueble.estadosHistoricos.find(estado => estado.estado.id === 7)
        })        



        const arrayLiMuebles = mueblesPedido.map(mueble => {
            
            const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]

            return `<li>
                ${mueble?.cantidad} x ${mueble?.modelo.nombre} . ${mueble?.largo}cm x ${mueble?.alto}cm x ${mueble?.profundidad}cm . Color: ${mueble?.color.nombre} . Estado: ${ultimoEstado?.estado.nombre}
            </li>`

        })
        const htmlLiMuebles = arrayLiMuebles.join(" ")

        const html = `
        <div class="detallePedido">
            <h3>Pedido n° ${pedido?.id}</h3>
            <h4>Fecha entrega: ${pedido?.fechaEntrega ? new Date(pedido?.fechaEntrega).toLocaleDateString() : ""}</h4>
            <ul id="contenedor">
            ${esPedidoPendiente ? htmlLiMuebles : ''}
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


getConjuntoDatos()
.then(() => {
    filtrarPedidosPendientesYTerminados(cliente.pedidos);
    console.log("Pedidos en curso: ", pedidosPendientes);
    console.log("Pedidos terminados: ", pedidosTerminados);
    imprimirDatosCliente(cliente, contenedorDatosCliente);
    imprimirPedidos(pedidosPendientes, muebles, contenedorPedidosPendientes, "Pedidos en curso")
    imprimirPedidos(pedidosTerminados, muebles, contenedorPedidosEntregados, "Pedidos entregados")

})
.catch(err => {
    console.log("Entro en el catch")
    console.log(err)
    imprimirError("Cliente no encontrado", contenedorError)
})



