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
    const url = 'http://localhost:3000/usuarios?username='.concat(username);
    console.log({url})
    let user;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            user = await response.json()
        }
        else {
            throw error(response.statusText);
        }

        if (!user[0]) {
            alert('usuario inexistente')
        }
        else if (user[0].password === password) {
            sessionStorage.setItem('username', username);
            location.assign("index.html")
        }
        else alert('contraeña incorrecta')        
    }
    catch(err) {
        const error = {error: true, message: err.message}
        console.log(error)
    }

    
}
loginButton.onclick = (event) => {
    event.preventDefault();
    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;
    login(usernameValue, passwordValue);
}