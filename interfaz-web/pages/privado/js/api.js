
// devuleve una promesa
// resolve: devuleve el recurso solicitado (objeto o array de objetos)
// reject: devuleve un objeto de error



class API {

    // COLORES
    static getColores = () => {
        return new Promise(async(resolve, reject) => {

            let colores;
            try {
                const url = 'http://localhost:3000/colores';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getColorById = (idColor) => {
        return new Promise(async(resolve, reject) => {

            let color;
            try {
                const url = 'http://localhost:3000/colores/'.concat(idColor);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
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
                const url = 'http://localhost:3000/estados';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getEstadoById = (idEstado) => {
        return new Promise(async(resolve, reject) => {

            let estado;
            try {
                const url = 'http://localhost:3000/estados/'.concat(idEstado);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
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
                const url = 'http://localhost:3000/modelos';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getModeloById = (idModelo) => {
        return new Promise(async(resolve, reject) => {

            let modelo;
            try {
                const url = 'http://localhost:3000/modelos/'.concat(idModelo);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // PEDIDOS => /api/pedidos/...
    static getPedidos = () => {
        return new Promise(async(resolve, reject) => {

            let pedidos;
            try {
                const url = 'http://localhost:3000/pedidos';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getPedidoById = (idPedido) => {
        return new Promise(async(resolve, reject) => {

            let pedido;
            try {
                const url = 'http://localhost:3000/pedidos/'.concat(idPedido);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }
    static getPedidosByIdCliente = (idCliente) => {
        return new Promise(async(resolve, reject) => {

            let pedidos;
            try {
                const url = 'http://localhost:3000/pedidos?id_cliente='.concat(idCliente);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
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
                const url = 'http://localhost:3000/muebles';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getMuebleById = (idMueble) => {
        return new Promise(async(resolve, reject) => {

            let mueble;
            try {
                const url = 'http://localhost:3000/muebles/'.concat(idMueble);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }
    static getMueblesByIdPedido = (idPedido) => {
        return new Promise(async(resolve, reject) => {

            let muebles;
            try {
                const url = 'http://localhost:3000/muebles?id_pedido='.concat(idPedido);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }


    // USUARIOS
    static getUsuarios = () => {
        return new Promise(async(resolve, reject) => {

            let usuarios;
            try {
                const url = 'http://localhost:3000/usuarios';            
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok) {
                    usuarios = await response.json();
                    resolve(usuarios);
                }
                else {
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getUsuarioById = (idUsuario) => {
        return new Promise(async(resolve, reject) => {

            let usuario;
            try {
                const url = 'http://localhost:3000/usuarios/'.concat(idUsuario);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    // CLIENTES => /api/clientes/...
    static getClientes = () => {
        return new Promise(async(resolve, reject) => {

            let clientes;
            try {
                const url = 'http://localhost:3000/clientes';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }
    static getClienteById = (idCliente) => {
        return new Promise(async(resolve, reject) => {

            let cliente;
            try {
                const url = 'http://localhost:3000/clientes/'.concat(idCliente);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    // TIPOS CLIENTE
    static getTiposCliente = () => {
        return new Promise(async(resolve, reject) => {

            let tipos_cliente;
            try {
                const url = 'http://localhost:3000/tipos_cliente';            
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
                    throw error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

    static getTipoClienteById = (idTipoCliente) => {
        return new Promise(async(resolve, reject) => {

            let tipo_cliente;
            try {
                const url = 'http://localhost:3000/tipos_cliente/'.concat(idTipoCliente);
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
                    throw new Error(response.statusText);
                }
            }
            catch(err) {
                const error = {error: true, message: err.message}
                console.log(error)
                reject(error)
            }
        })
    }

} 













// // COLORES
// const getColores = () => {
//     return new Promise(async(resolve, reject) => {

//         let colores;
//         try {
//             const url = 'http://localhost:3001/api/colores';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 colores = await response.json();
//                 resolve(colores);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getColorById = (idColor) => {
//     return new Promise(async(resolve, reject) => {

//         let color;
//         try {
//             const url = 'http://localhost:3001/api/colores/'.concat(idColor);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 color = await response.json();
//                 resolve(color);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // ESTADOS
// const getEstados = () => {
//     return new Promise(async(resolve, reject) => {

//         let estados;
//         try {
//             const url = 'http://localhost:3001/api/estados';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 estados = await response.json();
//                 resolve(estados);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getEstadoById = (idEstado) => {
//     return new Promise(async(resolve, reject) => {

//         let estado;
//         try {
//             const url = 'http://localhost:3001/api/estados/'.concat(idEstado);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 estado = await response.json();
//                 resolve(estado);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // MODELOS
// const getModelos = () => {
//     return new Promise(async(resolve, reject) => {

//         let modelos;
//         try {
//             const url = 'http://localhost:3001/api/modelos';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 modelos = await response.json();
//                 resolve(modelos);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getModeloById = (idModelo) => {
//     return new Promise(async(resolve, reject) => {

//         let modelo;
//         try {
//             const url = 'http://localhost:3001/api/modelos/'.concat(idModelo);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 modelo = await response.json();
//                 resolve(modelo);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // PEDIDOS
// const getPedidos = () => {
//     return new Promise(async(resolve, reject) => {

//         let pedidos;
//         try {
//             const url = 'http://localhost:3001/api/pedidos';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 pedidos = await response.json();
//                 resolve(pedidos);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getPedidooById = (idPedido) => {
//     return new Promise(async(resolve, reject) => {

//         let pedido;
//         try {
//             const url = 'http://localhost:3001/api/pedidos/'.concat(idPedido);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 pedido = await response.json();
//                 resolve(pedido);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // MUEBLES
// const getMuebles = () => {
//     return new Promise(async(resolve, reject) => {

//         let muebles;
//         try {
//             const url = 'http://localhost:3001/api/muebles';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 muebles = await response.json();
//                 resolve(muebles);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getMuebleById = (idMueble) => {
//     return new Promise(async(resolve, reject) => {

//         let mueble;
//         try {
//             const url = 'http://localhost:3001/api/muebles/'.concat(idMueble);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 mueble = await response.json();
//                 resolve(mueble);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // MUEBLES HAS ESTADOS
// const getMuebleHasEstado = () => {
//     return new Promise(async(resolve, reject) => {

//         let mueblesHasEstado;
//         try {
//             const url = 'http://localhost:3001/api/muebles_has_estado';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 mueblesHasEstado = await response.json();
//                 resolve(mueblesHasEstado);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getMueblesHasEstadoById = (idMueble) => {
//     return new Promise(async(resolve, reject) => {

//         let muebleHasEstado;
//         try {
//             const url = 'http://localhost:3001/api/muebles_has_estado/'.concat(idMueble);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 muebleHasEstado = await response.json();
//                 resolve(muebleHasEstado);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // USUARIOS
// const getUsuarios = () => {
//     return new Promise(async(resolve, reject) => {

//         let usuarios;
//         try {
//             const url = 'http://localhost:3001/api/usuarios';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 usuarios = await response.json();
//                 resolve(usuarios);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const getUsuarioById = (idUsuario) => {
//     return new Promise(async(resolve, reject) => {

//         let usuario;
//         try {
//             const url = 'http://localhost:3001/api/usuarios/'.concat(idUsuario);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 usuario = await response.json();
//                 resolve(usuario);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // CLIENTES
// const getClientes = () => {
//     return new Promise(async(resolve, reject) => {

//         let clientes;
//         try {
//             const url = 'http://localhost:3001/api/clientes';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 clientes = await response.json();
//                 resolve(clientes);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }
// const getClienteById = (idCliente) => {
//     return new Promise(async(resolve, reject) => {

//         let cliente;
//         try {
//             const url = 'http://localhost:3001/api/clientes/'.concat(idCliente);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 cliente = await response.json();
//                 resolve(cliente);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }


// // TIPOS CLIENTE
// const getTiposCliente = () => {
//     return new Promise(async(resolve, reject) => {

//         let tipos_cliente;
//         try {
//             const url = 'http://localhost:3001/api/tipos_cliente';            
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 tipos_cliente = await response.json();
//                 resolve(tipos_cliente);
//             }
//             else {
//                 throw error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

// const geTipoClienteById = (idTipoCliente) => {
//     return new Promise(async(resolve, reject) => {

//         let tipo_cliente;
//         try {
//             const url = 'http://localhost:3001/api/tipos_cliente/'.concat(idTipoCliente);
//             console.log({url})

//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             if(response.ok) {
//                 tipo_cliente = await response.json();
//                 resolve(tipo_cliente);
//             }
//             else {
//                 throw new Error(response.statusText);
//             }
//         }
//         catch(err) {
//             const error = {error: true, message: err.message}
//             console.log(error)
//             reject(error)
//         }
//     })
// }

