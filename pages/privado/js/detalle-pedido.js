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
            API.getMueblesByIdPedido(idPedido)
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
    const mueblesPedido = arrayMueblesAFiltrar.filter(mueble => mueble.pedido.id === pedido.id)
    // itero todos los muebles del pedido y lo asigno a mueblesTerminados o a mueblesPendientes, según corresponda
    mueblesPedido?.forEach(mueble => {
        // console.error("Mueble nro ", mueble.id)  //
        
        // filtro los estados del mueble que estoy iterando
        let muebleEstaTerminado = false;

        // itero por cada estado y el resultado total es si el mueble está terminado o no

            if(mueble.estadosHistoricos) {
                for(const estadoHistorico of mueble.estadosHistoricos) {
                    console.log("Estado: ", estadoHistorico.estado.id)  //
                    if (estadoHistorico.estado.id === 7) {
                        muebleEstaTerminado = true
                        break
                    }
                }                    
            }            

        console.log("Mueble está terminado: ", muebleEstaTerminado)  //
        // console.log(`Mueble ${mueble.id} esta terminado? `, muebleEstaTerminado)  

        if(muebleEstaTerminado) {
            mueblesTerminados.push(mueble)
        }
        else {
            mueblesPendientes.push(mueble)    
        }
    })
}

const imprimirDatosPedido = (pedido, elementoContenedor) => {
    const plantillaHTML = `
    <h2 id="pedidoNro">Pedido nro ${pedido?.id}</h2>
    <div>
        <div>
            <p><span class="datos-nombreDato">Cliente:</span> ${pedido?.cliente.nombre} ${pedido?.cliente.apellido}</p>
            <p><span class="datos-nombreDato">Fecha entrega:</span>  ${pedido?.fechaEntrega ? new Date(pedido?.fechaEntrega).toLocaleDateString() : ""}</p>
            <p><span class="datos-nombreDato">Dirección entrega:</span> ${pedido?.direccionEntrega}</p>
            <p><span class="datos-nombreDato">Estado:</span> ${mueblesPendientes.length>0 ? "Pendiente" : "Terminado"}</p>        
        </div>
        <div>
            <p><span class="datos-nombreDato">Notas</span></p>
            <p class="datos-notas">${pedido?.notas}</p>
        </div>        
    </div>`


    elementoContenedor.innerHTML = plantillaHTML;

}

const imprimirMuebles = (muebles, elementoContenedor, titulo) => {

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
.catch(err => {
    console.log(err)
    imprimirError("Pedido no encontrado", contenedorError)
})


