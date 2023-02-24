// URLparams
const params = new URLSearchParams(location.search)
const idEstado = params.get('estado')

const bodyTablaMuebles = document.getElementById('bodyTablaMuebles');
const tablaMuebles = document.getElementById('tablaMuebles');


let muebles;

const imprimirTablaProduccion = (listaMuebles, tableBody, table) => {
    listaMuebles.forEach(mueble =>{
        const ultimoEstadoMueble = mueble.estadosHistoricos.sort((a,b) => new Date(a.fecha)-new Date(b.fecha))[mueble.estadosHistoricos.length-1]
        const html = `                
            <tr>
                <td>${mueble.id}</td>
                <td>${mueble.pedido.fechaEntrada ? new Date(mueble.pedido.fechaEntrada).toLocaleDateString() : ""}</td>
                <td>${mueble.cantidad}</td>
                <td>${mueble.modelo.nombre}</td>
                <td>${mueble.largo}cm x ${mueble.alto}cm x ${mueble.profundidad}cm</td>
                <td>${mueble.color.nombre}</td>
                <td>${ultimoEstadoMueble.estado.nombre}</td>
                <td>${mueble.pedido.cliente.nombre} ${mueble.pedido.cliente.apellido}</td>
                <td>${mueble.pedido.id}</td>
                <td><a href="detalle-mueble.html?id=${mueble.id}"> <i class="fa-solid fa-circle-info"></i> </a></td>
            </tr>`

        tableBody.innerHTML += html;
    })

    table.classList.remove('hide');

}



API.getMuebles()
.then(muebles => {
    console.log({muebles})
    try {
        imprimirTablaProduccion(muebles, bodyTablaMuebles, tablaMuebles)        
    }
    catch(err) {
        console.log(err)
    }

})
.catch(err => {
    console.log({err})
    imprimirError("Error mostrando los datos", contenedorError)
})



/*
const imprimirTabla = (muebles, pedidos, estadosHistoricos, elementoContenedor) => {
    const fragment = new DocumentFragment;
    console.log("MUEBLES => ", muebles)
    console.log("PEDIDOS", pedidos)
    console.log("ESTADOSHistoricos", estadosHistoricos)


    muebles.forEach(mueble =>{
        console.log({mueble})
        console.log(mueble.id_pedido)
        const pedidoMueble = pedidos.find(pedido => pedido.id === mueble.id_pedido)
        console.error({pedidoMueble});
        const estadosHistoricosMueble = estadosHistoricos.filter(estado => estado.id_mueble === mueble.id)
        console.log({estadosHistoricosMueble})
        const ultimoEstadoMueble = estadosHistoricosMueble.sort((a,b) => new Date(a.fecha)-new Date(b.fecha))[estadosHistoricosMueble.length-1]
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
*/