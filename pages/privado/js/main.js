// Maneja el login //
// Maneja el login //

const loginButton = document.getElementById('loginButton')
const usernameInput = document.getElementById('usernameInput')
const login = (usernameValue) => {
    const username = usernameInput.value;
    console.log("usernameValue: ", username)
    sessionStorage.setItem('username', username);
    location.assign("index.html")
}
loginButton.onclick = () => {
    event.preventDefault();
    login(usernameInput);
}