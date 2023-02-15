// URLparams
const params = new URLSearchParams(location.search)
const idEstado = params.get('estado')

const bodyTablaMuebles = document.getElementById('bodyTablaMuebles');
const tablaMuebles = document.getElementById('tablaMuebles');


let muebles;
let pedidos;


const getConjuntoDatos = () => {
    return new Promise((resolve, reject) => {
        
        Promise.allSettled([  
            API.getPedidos(),        
            API.getMuebles()
        ])
        .then(results => {

            results[0].value ? pedidos = results[0].value : console.log("Error fetch pedidos: ", results[0].reason)
            console.log({pedidos})

            results[1].value ? muebles = results[1].value : console.log("Error fetch muebles: ", results[1].reason) 
            console.log({muebles})
        
            resolve()
        })
    })
}


const imprimirTablaProduccion = (listaMuebles, listaPedidos, tableBody, table) => {
    listaMuebles.forEach(mueble =>{
        const pedidoMueble = listaPedidos.find(pedido => pedido.id === mueble.id_pedido)
        const ultimoEstadoMueble = mueble.estados.sort((a,b) => new Date(a.fecha)-new Date(b.fecha))[mueble.estados.length-1]
        const html = `                
            <tr>
                <td>${mueble.id}</td>
                <td>${new Date(pedidoMueble.fecha_entrada).toLocaleDateString()}</td>
                <td>${mueble.cantidad}</td>
                <td>${mueble.modelo}</td>
                <td>${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm</td>
                <td>${mueble.color}</td>
                <td>${ultimoEstadoMueble.estado}</td>
                <td>${pedidoMueble.cliente.nombre} ${pedidoMueble.cliente.apellido}</td>
                <td>${pedidoMueble.id}</td>
                <td>${mueble.notas}</td>
                <td><a href="detalle-mueble.html?id=${mueble.id}"> <i class="fa-solid fa-circle-info"></i> </a></td>
                <td><a href="edit-mueble.html?id=${mueble.id}"> <i class="fa-regular fa-pen-to-square"></i> </a></td>
            </tr>`

        tableBody.innerHTML += html;
    })

    table.classList.remove('hide');

}


const imprimirTabla = (muebles, pedidos, estados, elementoContenedor) => {
    const fragment = new DocumentFragment;
    console.log("MUEBLES => ", muebles)
    console.log("PEDIDOS", pedidos)
    console.log("ESTADOS", estados)


    muebles.forEach(mueble =>{
        console.log({mueble})
        console.log(mueble.id_pedido)
        const pedidoMueble = pedidos.find(pedido => pedido.id === mueble.id_pedido)
        console.error({pedidoMueble});
        const estadosMueble = estados.filter(estado => estado.id_mueble === mueble.id)
        console.log({estadosMueble})
        const ultimoEstadoMueble = estadosMueble.sort((a,b) => new Date(a.fecha)-new Date(b.fecha))[estadosMueble.length-1]
        console.error({ultimoEstadoMueble});

        const tr = document.createElement('tr');

        const tdNro = document.createElement('td');
        const tdEntrega = document.createElement('td');
        const tdCant = document.createElement('td');
        const tdModelo = document.createElement('td');
        const tdMedidas = document.createElement('td');
        const tdColor = document.createElement('td');
        const tdEstado = document.createElement('td');
        const tdCliente = document.createElement('td');
        const tdPedido = document.createElement('td');
        const tdNotas = document.createElement('td');
        const tdDetalles = document.createElement('td');

        tdNro.textContent = mueble.id;
        tdEntrega.textContent = new Date(pedidoMueble.fecha_entrega).toLocaleDateString();
        tdCant.textContent = mueble.cantidad;
        tdModelo.textContent = mueble.modelo_V.nombre;
        tdMedidas.textContent = `${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm`;
        tdColor.textContent = mueble.color_V.nombre;
        tdEstado.textContent = ultimoEstadoMueble?.estado_V.nombre;
        tdCliente.textContent = `${pedidoMueble.cliente_V.nombre} ${pedidoMueble.cliente_V.apellido}`;
        tdPedido.textContent = mueble.id_pedido;
        tdNotas.textContent = mueble.notas;
        tdDetalles.innerHTML = `<a href="detalle-mueble.html?id=${mueble?.id}"> <i class="fa-solid fa-file-invoice"></i> </a>`
        
        tdDetalles.dataset.idMueble = mueble?.id;
        tr.dataset.idMueble = mueble?.id;
        
        tr.appendChild(tdNro);
        tr.appendChild(tdEntrega);
        tr.appendChild(tdCant);
        tr.appendChild(tdModelo);
        tr.appendChild(tdMedidas);
        tr.appendChild(tdColor);
        tr.appendChild(tdEstado);
        tr.appendChild(tdCliente);
        tr.appendChild(tdPedido);
        tr.appendChild(tdNotas);
        tr.appendChild(tdDetalles);

        fragment.appendChild(tr)
        console.log({pedidoMueble})
    })

    elementoContenedor.appendChild(fragment);
    tablaMuebles.classList.remove('hide');
    // tablaMuebles.classList.add('showBlock');
}





getConjuntoDatos()
.then(() => {
    console.log({muebles})
    console.log({pedidos})
    imprimirTablaProduccion(muebles, pedidos, bodyTablaMuebles, tablaMuebles)
})
