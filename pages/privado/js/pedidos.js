const bodyTablaPedidos = document.getElementById('bodyTablaPedidos');
const tablaPedidos = document.getElementById('tablaPedidos');

let pedidos;


const imprimirTablaPedidos = (listaPedidos, tableBody, table) => {
    listaPedidos.forEach(pedido =>{
        const html = `                
            <tr>
                <td>${pedido.id}</td>
                <td>${pedido.cliente.nombre} ${pedido.cliente.apellido}</td>
                <td>${pedido.fechaEntrada? new Date(pedido.fechaEntrada).toLocaleDateString() : ""}</td>
                <td>${pedido.fechaEntrega? new Date(pedido.fechaEntrega).toLocaleDateString() : ""}</td>
                <td>${pedido.direccionEntrega}</td>
                <td>${pedido.notas}</td>
                <td><a href="detalle-pedido.html?id=${pedido.id}"> <i class="fa-solid fa-circle-info"></i> </a></td>
                <td><a href="edit-pedido.html?id=${pedido.id}"> <i class="fa-regular fa-pen-to-square"></i> </a></td>
            </tr>`

        tableBody.innerHTML += html;
    })

    table.classList.remove('hide');

}

const imprimirError = (mensaje, elementoContenedor) => {
    console.log({elementoContenedor})
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}



API.getPedidos()
.then(data => {
    pedidos = data;
    console.log({pedidos})    

    imprimirTablaPedidos(pedidos, bodyTablaPedidos, tablaPedidos)
})
.catch(err => {
    console.log({err})
    imprimirError("Error mostrando los datos", contenedorError)
})


