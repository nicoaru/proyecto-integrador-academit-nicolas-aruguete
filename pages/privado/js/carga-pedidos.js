const idPedido = 5;

const nuevoPedido = {
    direccionEntrega: "Direccion alguna 1324",
    notas: "Tales notas, tales otras notas ...",
    fechaEntrada: new Date().getTime(),
    fechaEntrega: new Date("2023-04-20").getTime(),
    cliente: {id:5}
}

console.log(nuevoPedido);

API.createPedido(nuevoPedido)
.then(async data => {
    const idGenerado = data;
    console.log("Id generado: ", data);

    API.getPedidoById(idGenerado)
    .then(data => {
        console.log("Pedido de la base de datos")
        console.log(data)
    })

})
.catch(err => {
    console.log("Error: ", err)
})

/*
id_cliente
direccion
notas
fecha
fecha
*/