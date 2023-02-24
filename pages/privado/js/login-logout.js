// elementos del DOM
const loginButton = document.getElementById('loginButton')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')

const logoutButton = document.getElementById('logoutButton')
console.log("logoutButton: ", logoutButton)

/*** Login ***/

const login = async(username, password) => {
    let userRequest = {username, password}
    let user;

    if(!username || !password) {
        alert("Faltan datos")
        return
    }

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

if(loginButton) {
    loginButton.onclick = (event) => {
        event.preventDefault();
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;
        login(usernameValue, passwordValue);
    }   
}


/*** Logout ***/

const logout = () => {
            
    sessionStorage.removeItem('username');
    location.assign("../../index.html")
        
       
}

logoutButton.onclick = (event) => {
    event.preventDefault();
    logout();
}