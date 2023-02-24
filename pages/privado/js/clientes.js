const bodyTablaClientes = document.getElementById('bodyTablaClientes');
const tablaClientes = document.getElementById('tablaClientes');


const imprimirTablaClientes = (listaClientes, tableBody, table) => {
    listaClientes.forEach(cliente =>{
        const html = `                
            <tr>
                <td>${cliente.nombre} ${cliente.apellido}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.email}</td>
                <td>${cliente.tipoCliente.nombre}</td>
                <td><a href="detalle-cliente.html?id=${cliente.id}"> <i class="fa-solid fa-circle-info"></i> </a></td>
            </tr>`

            tableBody.innerHTML += html;
    })

    table.classList.remove('hide');

}

const imprimirError = (mensaje, elementoContenedor) => {
    console.log({elementoContenedor})
    elementoContenedor.innerHTML = `<h2>${mensaje}</h2>`
}



API.getClientes()
.then(clientes => {
    console.log({clientes})

    imprimirTablaClientes(clientes, bodyTablaClientes, tablaClientes)
})
.catch(err => {
    console.log({err})
    imprimirError("Error mostrando los datos", contenedorError)
})