// Simulación de usuarios en la base de datos //
// Simulación de usuarios en la base de datos //
const users = [
    {username: 'nicoaru',
    password: '1234'},
    {username: 'juanperez',
    password: '2345'},
    {username: 'anaprada',
    password: '3456'}
]



// Maneja el login //
// Maneja el login //

const loginButton = document.getElementById('loginButton')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')

const login = (usernameValue) => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log("usernameValue: ", username);

    const user = users.find(elem => {
        return elem.username === username;
    })

    console.log({user});

    if (!user) alert('usuario inexistente')
    else if (user.password === password) {
        sessionStorage.setItem('username', username);
        location.assign("index.html")
    }
    else alert('contraeña incorrecta')
    
}
loginButton.onclick = (event) => {
    event.preventDefault();
    login(usernameInput);
}