
const urlServer = "http://localhost:8080/JavaServer-1.0-SNAPSHOT";

// devuleve una promesa
// resolve: devuleve el recurso solicitado (objeto o array de objetos)
// reject: devuleve un objeto de error
class API {

    // LOGIN
    static login = (userRequest) => {
        return new Promise(async(resolve, reject) => {

            let usuario;
            try {
                const url = urlServer+'/api/login';            
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userRequest)
                })
                if(response.ok) {
                    usuario = await response.json();
                    resolve(usuario);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // USUARIOS
    static getUsuarioByUsername = (username) => {
        return new Promise(async(resolve, reject) => {

            let usuario;
            try {
                const url = urlServer+'/api/usuarios?username='.concat(username);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    usuario = await response.json();
                    resolve(usuario);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getUsuarioById = (idUsuario) => {
        return new Promise(async(resolve, reject) => {

            let usuario;
            try {
                const url = urlServer+'/api/usuarios/'+(idUsuario);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    usuario = await response.json();
                    resolve(usuario);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // CLIENTES 
    static getClientes = () => {
        return new Promise(async(resolve, reject) => {

            let clientes;
            try {
                const url = urlServer+'/api/clientes';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    clientes = await response.json();
                    resolve(clientes);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }
    static getClienteById = (idCliente) => {
        return new Promise(async(resolve, reject) => {

            let cliente;
            try {
                const url = urlServer+'/api/clientes/'+(idCliente);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    cliente = await response.json();
                    resolve(cliente);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // PEDIDOS 
    static getPedidos = () => {
        return new Promise(async(resolve, reject) => {

            let pedidos;
            try {
                const url = urlServer+'/api/pedidos';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    pedidos = await response.json();
                    resolve(pedidos);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getPedidoById = (idPedido) => {
        return new Promise(async(resolve, reject) => {

            let pedido;
            try {
                const url = urlServer+'/api/pedidos/'.concat(idPedido);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    pedido = await response.json();
                    resolve(pedido);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getPedidosByIdCliente = (idCliente) => {
        return new Promise(async(resolve, reject) => {

            let pedidos;
            try {
                const url = urlServer+'/api/clientes/'+idCliente+'/pedidos';
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    pedidos = await response.json();
                    resolve(pedidos);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static createPedido = (nuevoPedido) => {
        return new Promise(async(resolve, reject) => {

            let pedidos;
            try {
                const url = urlServer+'/api/pedidos';
                console.log({url})

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoPedido)
                })
                if(response.ok) {
                    pedidos = await response.json();
                    resolve(pedidos);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }



    // MUEBLES
    static getMuebles = () => {
        return new Promise(async(resolve, reject) => {

            let muebles;
            try {
                const url = urlServer+'/api/muebles';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    muebles = await response.json();
                    resolve(muebles);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getMuebleById = (idMueble) => {
        return new Promise(async(resolve, reject) => {

            let mueble;
            try {
                const url = urlServer+'/api/muebles/'.concat(idMueble);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    mueble = await response.json();
                    resolve(mueble);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getMueblesByIdCliente = (idCliente) => {
        return new Promise(async(resolve, reject) => {

            let muebles;
            try {
                const url = urlServer+'/api/clientes/'+idCliente+'/pedidos/muebles';
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    muebles = await response.json();
                    resolve(muebles);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }
    
    static getMueblesByIdPedido = (idPedido) => {
        return new Promise(async(resolve, reject) => {

            let muebles;
            try {
                const url = urlServer+'/api/pedidos/'+idPedido+'/muebles';
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    muebles = await response.json();
                    resolve(muebles);
                }
                else {
                    let data = await response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }



    //**** ****//

    // TIPOS CLIENTE
    static getTiposCliente = () => {
        return new Promise(async(resolve, reject) => {

            let tipos_cliente;
            try {
                const url = urlServer+'/api/tipos-cliente';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    tipos_cliente = await response.json();
                    resolve(tipos_cliente);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getTipoClienteById = (idTipoCliente) => {
        return new Promise(async(resolve, reject) => {

            let tipo_cliente;
            try {
                const url = urlServer+'/api/tipos-cliente/'+idTipoCliente;
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    tipo_cliente = await response.json();
                    resolve(tipo_cliente);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // MODELOS
    static getModelos = () => {
        return new Promise(async(resolve, reject) => {

            let modelos;
            try {
                const url = urlServer+'/api/modelos';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    modelos = await response.json();
                    resolve(modelos);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getModeloById = (idModelo) => {
        return new Promise(async(resolve, reject) => {

            let modelo;
            try {
                const url = urlServer+'/api/modelos/'.concat(idModelo);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    modelo = await response.json();
                    resolve(modelo);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // COLORES
    static getColores = () => {
        return new Promise(async(resolve, reject) => {

            let colores;
            try {
                const url = urlServer+'/api/colores';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    colores = await response.json();
                    resolve(colores);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getColorById = (idColor) => {
        return new Promise(async(resolve, reject) => {

            let color;
            try {
                const url = urlServer+'/api/colores/'.concat(idColor);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    color = await response.json();
                    resolve(color);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // ESTADOS
    static getEstados = () => {
        return new Promise(async(resolve, reject) => {

            let estados;
            try {
                const url = urlServer+'/api/estados';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    estados = await response.json();
                    resolve(estados);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getEstadoById = (idEstado) => {
        return new Promise(async(resolve, reject) => {

            let estado;
            try {
                const url = urlServer+'/api/estados/'.concat(idEstado);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    estado = await response.json();
                    resolve(estado);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // ESTADOS HISTORICOS
    static getEstadosHistoricos = () => {
        return new Promise(async(resolve, reject) => {

            let estadosHistoricos;
            try {
                const url = urlServer+'/api/estados-historicos';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    estadosHistoricos = await response.json();
                    resolve(estadosHistoricos);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getEstadoHistoricoById = (idEstadoHistorico) => {
        return new Promise(async(resolve, reject) => {

            let estadoHistorico;
            try {
                const url = urlServer+'/api/estado-historico/'.concat(idEstadoHistorico);
                console.log({url})

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    estadoHistorico = await response.json();
                    resolve(estadoHistorico);
                }
                else {
                    let data = response.json();
                    const errorHTTP = {error: true, statusCode: response.status, message: response.statusText, data: data}
                    console.log(errorHTTP)
                    reject(errorHTTP)
                }
            }
            catch(err) {
                const error = {error: true, message: "Error en el client-side: "+err.message}
                console.log(error)
                reject(error)
            }
        })
    }

} 

