// Chequea si está loggeado y resuelve en función de eso //
// Chequea si está loggeado y resuelve en función de eso //

const username = sessionStorage.getItem("username");
const pathname = location.pathname
const page = pathname.split('/').pop()

console.log("username en sessionStorage ", username)
console.log('location: ', pathname)
console.log({page})

if (!username && (page !== 'login.html')) {
    location.replace("login.html")
}
else if (username && (page === 'login.html')) {
    location.replace('index.html')
}