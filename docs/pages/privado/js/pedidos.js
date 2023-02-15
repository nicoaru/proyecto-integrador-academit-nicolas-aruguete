const bodyTablaPedidos = document.getElementById('bodyTablaPedidos');
const tablaPedidos = document.getElementById('tablaPedidos');

let pedidos;

// const imprimirTabla = (pedidos, elementoContenedor) => {
//     const fragment = new DocumentFragment;

//     pedidos.forEach(pedido =>{
//         const tr = document.createElement('tr');

//         const tdNro = document.createElement('td');
//         const tdCliente = document.createElement('td');
//         const tdEntrada = document.createElement('td');
//         const tdEntrega = document.createElement('td');
//         const tdDireccionentrega = document.createElement('td');
//         const tdNotas = document.createElement('td');
//         const tdDetalles = document.createElement('td');

//         tdNro.textContent = pedido?.id;
//         tdCliente.textContent = `${pedido?.cliente_V.nombre} ${pedido?.cliente_V.apellido}`;
//         tdEntrada.textContent = new Date(pedido?.fecha_entrada).toLocaleDateString();
//         tdEntrega.textContent = new Date(pedido?.fecha_entrega).toLocaleDateString();
//         tdDireccionentrega.textContent = pedido?.direccion_entrega;
//         tdNotas.textContent = pedido?.notas

//         tdDetalles.innerHTML = `<a href="detalle-pedido.html?id=${pedido?.id}"> <i class="fa-solid fa-file-invoice"></i> </a>`
//         tdDetalles.dataset.idPedido = pedido?.id;

//         tr.dataset.idPedido = pedido?.id;
//         tr.appendChild(tdNro);
//         tr.appendChild(tdCliente);
//         tr.appendChild(tdEntrada);
//         tr.appendChild(tdEntrega);
//         tr.appendChild(tdDireccionentrega);
//         tr.appendChild(tdNotas);
//         tr.appendChild(tdDetalles);


//         fragment.appendChild(tr)
//     })

//     elementoContenedor.appendChild(fragment);
//     tablaPedidos.classList.remove('hide');
//     // tablaPedidos.classList.add('showBlock');
// }

const imprimirTablaPedidos = (listaPedidos, tableBody, table) => {
    listaPedidos.forEach(pedido =>{
        const html = `                
            <tr>
                <td>${pedido.id}</td>
                <td>${pedido.cliente.nombre} ${pedido.cliente.apellido}</td>
                <td>${new Date(pedido.fecha_entrada).toLocaleDateString()}</td>
                <td>${new Date(pedido.fecha_entrega).toLocaleDateString()}</td>
                <td>${pedido.direccion_entrega}</td>
                <td>${pedido.notas}</td>
                <td><a href="detalle-pedido.html?id=${pedido.id}"> <i class="fa-solid fa-circle-info"></i> </a></td>
                <td><a href="edit-pedido.html?id=${pedido.id}"> <i class="fa-regular fa-pen-to-square"></i> </a></td>
            </tr>`

        tableBody.innerHTML += html;
    })

    table.classList.remove('hide');

}

API.getPedidos()
.then(data => {
    pedidos = data;
    console.log({pedidos})    

    imprimirTablaPedidos(pedidos, bodyTablaPedidos, tablaPedidos)
})


