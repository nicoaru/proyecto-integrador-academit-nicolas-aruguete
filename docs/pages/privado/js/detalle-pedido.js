// URLparams
const params = new URLSearchParams(location.search)
const idPedido = params.get('id')

// contenedores
const contenedorDatosPedido = document.getElementById('contenedorDatosPedido');
const contenedorMueblesPendientes = document.getElementById('contenedorMueblesPendientes')
const contenedorMueblesEntregados = document.getElementById('contenedorMueblesEntregados')
const contenedorError = document.getElementById('contenedorError')

// variables para guardar la data del fetch
let pedido;
let muebles;

// variables donde filtro los muebles pendientes y los terminados
let mueblesPendientes = [];
let mueblesTerminados = [];


const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([
            API.getPedidoById(idPedido),        
            API.getMuebles()
        ])
        .then(results => {

            results[0].value ? pedido = results[0].value : console.log(results[0].reason)
            console.log({pedido})

            results[1].value ? muebles = results[1].value : console.log(results[1].reason)
            console.log({muebles})
            
            pedido ? resolve() : reject(results[0].reason)
        })
    })

}

const filtrarMueblesPendientesYTerminados = (arrayMueblesAFiltrar) => {
    // filtro los muebles que pertenecen al pedido
    const mueblesPedido = arrayMueblesAFiltrar.filter(mueble => mueble.id_pedido === pedido.id)
    // itero todos los muebles del pedido y lo asigno a mueblesTerminados o a mueblesPendientes, según corresponda
    mueblesPedido?.forEach(mueble => {
        console.error("Mueble nro ", mueble.id)  //
        
        // filtro los estados del mueble que estoy iterando
        let muebleEstaTerminado = false;

        // itero por cada estado y el resultado total es si el mueble está terminado o no

            if(mueble.estados) {
                for(const estado of mueble.estados) {
                    console.log("Estado: ", estado.id_estado)  //
                    if (estado.id_estado === 7) {
                        muebleEstaTerminado = true
                        break
                    }
                }                    
            }            

        console.log("Mueble está terminado: ", muebleEstaTerminado)  //
        // console.log(`Mueble ${mueble.id} esta terminado? `, muebleEstaTerminado)  

        if(muebleEstaTerminado) mueblesTerminados.push(mueble)
        else mueblesPendientes.push(mueble)    
    })
}

const imprimirDatosPedido = (pedido, elementoContenedor) => {
    const plantilla_OK = `
    <h2 id="pedidoNro">Pedido nro ${pedido?.id}</h2>
    <div>
        <div>
            <p><span class="datos-nombreDato">Cliente:</span> ${pedido?.cliente.nombre} ${pedido?.cliente.apellido}</p>
            <p><span class="datos-nombreDato">Fecha entrega:</span> ${pedido?.fecha_entrega}</p>
            <p><span class="datos-nombreDato">Dirección entrega:</span> ${pedido?.direccion_entrega}</p>        
        </div>
        <div>
            <p><span class="datos-nombreDato">Notas</span></p>
            <p class="datos-notas">${pedido?.notas}</p>
        </div>        
    </div>`

    const plantilla_FAIL = `<h2>Pedido no encontrado</h2>`;

    if(pedido) elementoContenedor.innerHTML = plantilla_OK;
    else elementoContenedor.innerHTML = plantilla_FAIL;
}

const imprimirMuebles = (muebles, elementoContenedor, titulo) => {

    // const fragment = new DocumentFragment;
    const h2 = document.createElement('h2')
    h2.textContent = titulo
    // fragment.appendChild(h2)
    const div = document.createElement('div')
    div.appendChild(h2)

    muebles.forEach(mueble => {               
        const ultimoEstado = mueble.estados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estados.length-1]
        
        div.innerHTML += `<div>
            <p>
            ${mueble.cantidad} x ${mueble.modelo} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${mueble.color} . Estado: ${ultimoEstado.estado}
            </p>
        </div>`
    })
    elementoContenedor.appendChild(div)
}
const imprimirError = (mensaje, elementoContenedor) => {
    console.log({elementoContenedor})
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}




getConjuntoDatos()
.then(() => {
    filtrarMueblesPendientesYTerminados(muebles);
    imprimirDatosPedido(pedido, contenedorDatosPedido);
    imprimirMuebles(mueblesPendientes, contenedorMueblesPendientes, "Muebles en curso")
    imprimirMuebles(mueblesTerminados, contenedorMueblesEntregados, "Muebles entregados")

})
.catch(err => imprimirError("Pedido no encontrado", contenedorError))










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