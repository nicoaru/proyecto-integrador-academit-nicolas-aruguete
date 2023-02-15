// URLparams
const params = new URLSearchParams(location.search)
const idMueble = params.get('id')

// contenedores
const contenedorDatosMueble = document.getElementById('contenedorDatosMueble');
const contenedorDatosPedido = document.getElementById('contenedorDatosPedido');
const contenedorOtrosMueblesPedido = document.getElementById('contenedorOtrosMueblesPedido')
const contenedorError = document.getElementById('contenedorError')


// variables para guardar la data del fetch
let pedido;
let mueble;
let otrosMueblesPedido;

// variables donde filtro los muebles pendientes y los terminados
let mueblesPendientes = [];
let mueblesTerminados = [];


const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        API.getMuebleById(idMueble)
        .then(async data => {
            mueble = data;
            const idPedido = mueble.id_pedido
            
            await API.getPedidoById(idPedido)
            .then(data => { pedido = data; })
            .catch(err => { console.log({err}) })

            await API.getMueblesByIdPedido(idPedido)
            .then(data => {
                otrosMueblesPedido = data?.filter(mueble => mueble.id != idMueble)
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
    const ultimoEstado = mueble.estados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estados.length-1]
    const plantilla_FAIL = `<h2>Pedido no encontrado</h2>`;
    const plantilla_OK = `
        <p>
            ${mueble.cantidad} x ${mueble.modelo} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${mueble.color} . Estado: ${ultimoEstado.estado}
        </p>`
    
    if(mueble) elementoContenedor.innerHTML = plantilla_OK;
    else elementoContenedor.innerHTML = plantilla_FAIL;

    
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
console.log({elementoContenedor})
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
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}



getConjuntoDatos()
.then(() => {
    imprimirDatosMueble(mueble, contenedorDatosMueble)
    imprimirDatosPedido(pedido, contenedorDatosPedido);
    imprimirMuebles(otrosMueblesPedido, contenedorOtrosMueblesPedido, "Otros muebles del mismo pedido")
})
.catch(err => imprimirError("Mueble no encontrado", contenedorError))










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