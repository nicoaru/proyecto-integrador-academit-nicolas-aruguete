console.log("username", sessionStorage.getItem("username"))
const username = sessionStorage.getItem("username");
const role = sessionStorage.getItem("role");

if (!username) location.replace("login.html")