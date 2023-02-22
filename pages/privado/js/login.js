// Simulación de usuarios en la base de datos //
// Simulación de usuarios en la base de datos //
// const users = [
//     {username: 'nicoaru',
//     password: '1234'},
//     {username: 'juanperez',
//     password: '2345'},
//     {username: 'anaprada',
//     password: '3456'}
// ]



// Maneja el login //
// Maneja el login //

const loginButton = document.getElementById('loginButton')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')

const login = async(username, password) => {
    let userRequest = {username, password}
    let user;

    API.login(userRequest)
    .then(data => {
        user = data;
        console.log({user})
        
        sessionStorage.setItem('username', user.username);
        location.assign("index.html")
        
    })
    .catch(err => {
        if(err.statusCode === 401) {
            alert("No autorizado")
            console.log('No autorizado')
        }
        else if (err.statusCode){
            alert("Hubo un problema en el servidor")
        }
        else alert("Tuvimos un problema. Lo siento")
    })
   
}

loginButton.onclick = (event) => {
    event.preventDefault();
    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;
    login(usernameValue, passwordValue);
}