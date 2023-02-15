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
let pedidos;
let muebles;

// variables donde filtro los pedidos pendientes y los terminados
let pedidosPendientes = [];
let pedidosTerminados = [];



const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([
            API.getClienteById(idCliente),         
            API.getPedidosByIdCliente(idCliente),        
            API.getMuebles()
        ])
        .then(results => {

            results[0].value ? cliente = results[0].value : console.log("Error fetch clientes: ", results[0].reason)
            console.log({cliente})

            results[1].value ? pedidos = results[1].value : console.log("Error fetch pedidos: ", results[1].reason)
            console.log({pedidos})

            results[2].value ? muebles = results[2].value : console.log("Error fetch muebles: ", results[2].reason) 
            console.log({muebles})
        
            cliente ? resolve() : reject(results[0].reason)

        })
    })

}

const filtrarPedidosPendientesYTerminados = (arrayPedidosAFiltrar) => {
    
    // itero todos los pedidos del cliente y lo asigno a pedidosTerminados o a pedidosPendientes, según corresponda
    arrayPedidosAFiltrar?.forEach(pedido => {
        // console.error("Pedido nro ", pedido.id)  //
        // filtro los muebles que sean del pedido que estoy iterando
        const mueblesPedido = muebles?.filter(mueble => mueble.id_pedido === pedido.id)
        
        if(mueblesPedido.length === 0) {
            return;
        }

        // itero por cada mueble y el resultado total es si el pedido está terminado o no
        const pedidoEstaTerminado = mueblesPedido?.every(mueble => {
            // console.log("Mueble nro: ", mueble.id)  //
            // filtro los estados del mueble que estoy iterando
            let muebleEstaTerminado = false;

            // itero por cada estado y el resultado total es si el mueble está terminado o no
            if(mueble.estados) {
                for(const estado of mueble.estados) {
                    // console.log("Estado: ", estado.id_estado)  //
                    if (estado.id_estado === 7) {
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

    const plantilla_OK = `
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

    const plantilla_FAIL = `<h2>Cliente no encontrado</h2>`;

    if(cliente) elementoContenedor.innerHTML = plantilla_OK;
    else elementoContenedor.innerHTML = plantilla_FAIL;
}
const imprimirPedidos = (pedidos, muebles, elementoContenedor, titulo) => {

    if(!muebles) titulo = "Pedidos (pero ojo que falló la descarga de algunos datos)"
    const divConjuntoPedidos = document.createElement('div');
    const h2 = document.createElement('h2')
    h2.textContent = titulo
    divConjuntoPedidos.appendChild(h2)

    pedidos?.forEach(pedido => {
        const mueblesPedido = muebles?.filter(mueble => mueble.id_pedido === pedido.id)    
        
        const arrayLiMuebles = mueblesPedido.map(mueble => {
            
            const ultimoEstado = mueble.estados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estados.length-1]

            return `<li>
                ${mueble?.cantidad} x ${mueble?.modelo} . ${mueble?.largo}cm x ${mueble?.alto}cm x ${mueble?.profundidad}cm . Color: ${mueble?.color} . Estado: ${ultimoEstado?.estado}
            </li>`

        })
        const htmlLiMuebles = arrayLiMuebles.join(" ")

        const html = `
        <div class="detallePedido">
            <h3>Pedido n° ${pedido.id}</h3>
            <h4>Fecha entrega: ${new Date(pedido.fecha_entrega).toLocaleDateString()}</h4>
            <ul id="contenedor">
            ${htmlLiMuebles}
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
    filtrarPedidosPendientesYTerminados(pedidos);
    imprimirDatosCliente(cliente, contenedorDatosCliente);
    if(cliente) {
        imprimirPedidos(pedidosPendientes, muebles, contenedorPedidosPendientes, "Pedidos en curso")
        imprimirPedidos(pedidosTerminados, muebles, contenedorPedidosEntregados, "Pedidos entregados")
    }
})
.catch(err => imprimirError("Cliente no encontrado", contenedorError))




/*
const filtrarPedidosPendientes = (pedidos) => {

    if(pedidos) {
        const pedidosPendientes = pedidos.filter(pedido => {      
            const mueblesPedido = muebles?.filter(mueble => mueble.id_pedido === pedido.id)
            
            const pedidoEstaPendiente = mueblesPedido?.some(mueble => {
                const estadosMueble = estados?.filter(estado => estado.id_mueble === mueble.id)

                let muebleEstaTerminado
                if(estadosMueble) {
                    for(const estado of estadosMueble) {
                        if (estado.id_estado === 7) {
                            muebleEstaTerminado = true
                            break
                        }
                    }                    
                }

                
                console.log(`Mueble ${mueble.id} esta terminado? `, muebleEstaTerminado)  

                return !muebleEstaTerminado   
            })
            return pedidoEstaPendiente;
        })        
        return pedidosPendientes
    }
    else return null;
}
const filtrarPedidosTerminados = (pedidos) => {

    if(pedidos) {
        const pedidosTerminados = pedidos.filter(pedido => {      
            const mueblesPedido = muebles?.filter(mueble => mueble.id_pedido === pedido.id)
            
            const pedidoEstaTerminado = mueblesPedido?.every(mueble => {
                const estadosMueble = estados?.filter(estado => estado.id_mueble === mueble.id)

                let muebleEstaTerminado
                if(estadosMueble) {
                    for(const estado of estadosMueble) {
                        if (estado.id_estado === 7) {
                            muebleEstaTerminado = true
                            break
                        }
                    }    
                }

                
                console.log(`Mueble ${mueble.id} esta terminado? `, muebleEstaTerminado)  

                return muebleEstaTerminado   
            })
            return pedidoEstaTerminado;
        })

        return pedidosTerminados        
    }
    else return null

}

*/








/*
        Promise.allSettled
        API.getClienteById(idCliente)
        .then(data => {
            cliente = data
            console.log(cliente)
            })      
        .catch(err => {
            console.log(err)
        })

        API.getPedidosByIdCliente(idCliente)
        .then(data => {
            pedidos = data
            console.log(pedidos)
            })      
        .catch(err => {
            console.log(err)
        })

        API.getMueblesByIdCliente(idCliente)
        .then(data => {
            muebles = data
            console.log(muebles)
            })      
        .catch(err => {
            console.log(err)
        })

        API.getEstadosDeMueblesByIdCliente(idCliente)
        .then(data => {
            estados = data
            console.log(estados)
            })      
        .catch(err => {
            console.log(err)
        })
*/

/*

const getConjuntoDatos = async () => {
        API.getClienteById(idCliente)
        .then(cliente => {
            console.log(cliente)
            cliente = cliente

            const idPedidosSet = new Set
            console.log({idPedidosSet})
            cliente.pedidos_V.forEach(pedido => idPedidosSet.add(pedido.id))
    
            const idPedidosArray = Array.from(idPedidosSet)

            // const idPedidosString = "[".concat(Array.from(idPedidosSet).toString(), "]")
            // console.log({idPedidosString})

            // const queryObject = {where: JSON.stringify({id_pedido: {in: idPedidosString}})}
            const queryObject = {where: JSON.stringify({id_pedido: {in: idPedidosArray}})}
            const queryString = new URLSearchParams(queryObject).toString()
            console.log("queryString: ", queryString)
            
            API.getMueblesByFilter(queryString)
            .then(muebles => {
                console.log(muebles)
                muebles = muebles
            })
        })        
        .catch(err => {
            console.log(err)
            reject(err)
        })
}

*/


/*
    API.getClienteById(idCliente)
    .then(cliente => {
        console.log(cliente)
        cliente = cliente

        const idPedidosSet = new Set
        console.log({idPedidosSet})
        cliente.pedidos_V.forEach(pedido => idPedidosSet.add(pedido.id))

        const idPedidosArray = Array.from(idPedidosSet)

        const queryObject = {where: JSON.stringify({id_pedido: {in: idPedidosArray}})}
        const queryString = new URLSearchParams(queryObject).toString()
        console.log("queryString: ", queryString)
        
        API.getMueblesByFilter(queryString)
        .then(muebles => {
            console.log(muebles)
            muebles = muebles
        })
    })        
    .catch(err => {
        console.log(err)
        reject(err)
    })

*/