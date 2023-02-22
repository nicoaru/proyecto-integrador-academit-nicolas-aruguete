const urlPlantillaDatosCliente = 'plantillas/datos-detalle-cliente.hbs';
const params = new URLSearchParams(location.search)
const idCliente = params.get('id')

const contenedorDatosCliente = document.getElementById('contenedorDatosCliente');
const contenedorPedidosPendientes = document.getElementById('contenedorPedidosPendientes')
const contenedorPedidosEntregados = document.getElementById('contenedorPedidosEntregados')

const queryPedidos = new URLSearchParams({id_cliente: idCliente}).toString()


let cliente;
let tiposCliente;
let pedidos;
let colores;
let modelos;
let estados;

let muebles;
let mueblesHasEstados;


const getConjuntoDatos = async () => {
    return new Promise((resolve, reject) => {
        Promise.allSettled([

            API.getClienteById(idCliente),
            API.getPedidosByFilter(queryPedidos),
            API.getTiposCliente(),
            API.getColores(),
            API.getModelos(),
            API.getEstados()
        ])
        .then(results => {
            console.log({results})
            cliente = results[0].status === 'fulfilled' ? results[0].value : undefined;
            pedidos = results[1].status === 'fulfilled' ? results[1].value : undefined;
            tiposCliente = results[2].status === 'fulfilled' ? results[2].value : undefined;
            colores = results[3].status === 'fulfilled' ? results[3].value : undefined;
            modelos = results[4].status === 'fulfilled' ? results[4].value : undefined;
            estados = results[5].status === 'fulfilled' ? results[5].value : undefined;
        
            console.log({pedidos})
            const arrayIdPedidos = [];
            pedidos.forEach(pedido => {
                arrayIdPedidos.push(pedido.id)
            })
            console.log({arrayIdPedidos})
            const queryMuebles = ''.concat('id_pedido=', arrayIdPedidos.join('&id_pedido='));
            console.log({queryMuebles});
            
            API.getMueblesByFilter(queryMuebles)
            .then(resultadoMuebles => {
                muebles = resultadoMuebles;
    
                const arrayIdMuebles = [];
                muebles.forEach(mueble => {
                    arrayIdMuebles.push(mueble.id)
                })
    
                const queryMHE = ''.concat('id_mueble=', arrayIdMuebles.join('&id_mueble='));
                console.log({queryMHE});
    
                API.getMueblesHasEstadoByFilter(queryMHE)
                .then(resultadoMuebles => {
                    mueblesHasEstados = resultadoMuebles;
                    console.log({mueblesHasEstados})
                    
                    resolve(true)
                })
            })
            .catch(err => console.log(err))
    
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    

    })

  
}

const imprimirDatosCliente = (cliente, tiposCliente, contenedor) => {

    const plantilla_OK = `
        <h2 id="nombreCliente">${cliente?.nombre || ''} ${cliente?.apellido || ''}</h2>
        <h3>Teléfono: ${cliente?.telefono || ''}</h3>
        <h3>Email: ${cliente?.email || ''}</h3>
        <h3>Dirección: ${cliente?.direccion || ''}</h3>
        <h3>Tipo cliente: ${tiposCliente[cliente.id_tipo_cliente]?.nombre || ''}</h3>
        <h3>Notas</h3>
        <p>${cliente?.notas || ''}</p>
    `;

    const plantilla_FAIL = `<h2>Cliente no encontrado</h2>`;

    if(cliente) contenedor.innerHTML = plantilla_OK;
    else contenedor.innerHTML = plantilla_FAIL;
}




const imprimirPedidosPendientes = (contenedor, pedidos) => {
    console.log({pedidos})
    
    const fragment = new DocumentFragment;
    const h2 = document.createElement('h2')
    h2.textContent = "Pedidos pendientes"
    fragment.appendChild(h2)

    pedidos.forEach(pedido => {
        let div = document.createElement('div');        
        let h3 = document.createElement('h3');
        let h4 = document.createElement('h4');
        let ul = document.createElement('ul');
        
        h3.textContent = `Pedido n° ${pedido.id || ''}`
        h4.textContent = `Fecha entrega: ${pedido.fecha_entrega || ''}`
        ul.id= "contenedor"

        const arrayLiMuebles = [];
        const mueblesPedido = muebles.filter(mueble => mueble.id_pedido === pedido.id)
        
        mueblesPedido.forEach(mueble => {
            const modelo = modelos.find(modelo => (modelo.id === mueble.id_modelo)).nombre
            const color = colores.find(color => (color.id === mueble.id_color)).nombre
            const idEstados = mueblesHasEstados.filter(elem => elem.id_mueble === mueble.id)
            idEstados.sort((a, b) => a.crated_at - b.crated_at)
            const idEstado = idEstados[idEstados.length-1].id_estado
            console.log({estados})
            const estado = estados.find(estado => estado.id === idEstado).nombre
            const li = document.createElement('li')
            li.textContent = `${mueble.cantidad} x ${modelo} . ${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm . Color: ${color} . Estado: ${estado}`
            arrayLiMuebles.push(li)
        })

        arrayLiMuebles.forEach(li => ul.appendChild(li))
        div.appendChild(h3)
        div.appendChild(h4)
        div.appendChild(ul)

        fragment.appendChild(div)
    })

    contenedor.appendChild(fragment)

}


const imprimirPedidosTerminados = (pedidos, muebles, colores, modelos, estados, muebleHasEstado) => {


}

(async () => {
    await getConjuntoDatos();

    const mueblesEntregados = muebles?.filter(mueble => {
        if(mueblesHasEstados.find(elem => (elem.id_estado === 7 && elem.id_mueble === mueble.id))) return true;
    })
    
    const mueblesPendientes = muebles?.filter(mueble => {
        if(!(mueblesHasEstados.find(elem => (elem.id_estado === 7 && elem.id_mueble === mueble.id)))) return true;
    })
    
    const pedidosPendientes = pedidos?.filter(pedido => {
        if(mueblesPendientes.find(elem => (elem.id_pedido === pedido.id))) return true;
    })

    const pedidosEntregados = pedidos?.filter(pedido => {
        if(!(mueblesPendientes.find(elem => (elem.id_pedido === pedido.id)))) return true;
    })

    imprimirDatosCliente(cliente, tiposCliente, contenedorDatosCliente)

    imprimirPedidosPendientes(contenedorPedidosPendientes, pedidosPendientes)


    
}

)()






/*

cliente by id
pedidos by id_cliente
tipos_cliente 
colores
modelos
estados

muebles by id_pedido
muebles_has_estados by id_mueble

    {
      "id": 1,
      "nombre": "Juan Ramón",
      "apellido": "Péres",
      "telefono": "11 4589-2747",
      "email": "juanramon@peres.com",
      "direccion": "Julian Álvarez 787, CABA",
      "notas": null,
      "id_tipo_cliente": 1,     //
      "created_at": 1673855451,
      "updated_at": null
    }
    {
      "id": 1,
      "fecha_entrada": "2023-01-20T00:02:04.507Z",
      "fecha_entrega": "2023-02-09T12:21:43.212Z",
      "direccion_entrega": "43290 Hermiston Glens, Oberá, Misiones",
      "notas": "eum nemo cum veritatis necessitatibus vitae explicabo tempore quaerat a odio doloremque a quaerat excepturi unde recusandae vero molestiae aspernatur",
      "id_cliente": 1,
      "created_at": 1675743724,
      "updated_at": null
    }

    {
      "id": 1,
      "largo": 130,
      "alto": 72,
      "profundidad": 130,
      "cantidad": 2,
      "notas": "beatae quam nostrum ducimus quam magni eos eum nostrum ducimus soluta reiciendis asperiores ab voluptates ipsam natus blanditiis voluptates facere",
      "id_color": 1,            //
      "id_modelo": 1,           //
      "id_pedido": 5,           //
      "created_at": 1675743724,
      "updated_at": null
    }
*/