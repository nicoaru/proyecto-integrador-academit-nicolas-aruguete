// URLparams
const params = new URLSearchParams(location.search)
const idMueble = params.get('id')

// contenedores
const contenedorDatosMueble = document.getElementById('contenedorDatosMueble');
const contenedorDatosPedido = document.getElementById('contenedorDatosPedido');
const contenedorOtrosMueblesPedido = document.getElementById('contenedorOtrosMueblesPedido')
const contenedorError = document.getElementById('contenedorError')


// variables para guardar la data del fetch
let mueble;
let otrosMueblesPedido;

const getConjuntoDatos = async () => {
    
    return new Promise((resolve, reject) => {
        API.getMuebleById(idMueble)
        .then(async data => {
            mueble = data;
            const idPedido = mueble.pedido.id
            console.log(mueble)

            await API.getMueblesByIdPedido(idPedido)
            .then(data => {
                otrosMueblesPedido = data
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
    const ultimoEstado = mueble.estadosHistoricos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[mueble.estadosHistoricos.length-1]
    const plantilla_FAIL = `<h2>Pedido no encontrado</h2>`;
    const plantilla_OK = `
        <p>
            ${mueble.cantidad} x ${mueble.modelo.nombre} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${mueble.color.nombre} . Estado: ${ultimoEstado.estado.nombre}
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
            <p><span class="datos-nombreDato">Fecha entrega:</span> ${pedido?.fecha_entrega ? new Date(pedido?.fechaEntrega).toDateString() : " - "}</p>
            <p><span class="datos-nombreDato">Dirección entrega:</span> ${pedido?.direccionEntrega}</p>        
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



getConjuntoDatos()
.then(() => {
    try {
        imprimirDatosMueble(mueble, contenedorDatosMueble)
        imprimirDatosPedido(mueble.pedido, contenedorDatosPedido);
        imprimirMuebles(otrosMueblesPedido, contenedorOtrosMueblesPedido, "Otros muebles del mismo pedido")        
    }
    catch(err) {
        console.log({err})
    }

})
.catch(err => {
    console.log("ERROR: ", {err})
    imprimirError("Mueble no encontrado", contenedorError)
})
